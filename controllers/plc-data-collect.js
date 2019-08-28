const timestamps = [];

function dataCollect(server){
//:TODO divide to 2-3 modules
    var TcpPort = require("modbus-serial").TcpPort;
    var tcpPort = new TcpPort("192.168.1.225");
    var ModbusRTU = require("modbus-serial");
    var client = new ModbusRTU(tcpPort);

    const BLOCK_START = 3200;
    const BLOCK_SIZE = 100;

    const m340 = require('./m340read');
    const bits = require('./bit-operations');
    bits.addBinFunctions();
    let handler = 0;

    //let m340data = [];
    let m340data = require('../public/data/m340data');
    //const logIt = require('./logger');

    let eco1 = [];


    const WebSocketServer = new require('ws');
    const wsClients = {};
    const webSocketServer = new WebSocketServer.Server({port : 8081});

    webSocketServer.on('connection', function(ws) {
        let id = Math.random();
        wsClients[id] = ws;

        ws.on('message', function(message) {;
            try {
                const jsonMessage = JSON.parse(JSON.parse(JSON.stringify(message)));
                //  console.log("_jsonMessage", jsonMessage);
                eco1 = jsonMessage.eco1;
                timestamps[0] =jsonMessage.timestamp;
                // console.log("eco1LastDayW38", eco1);
            } catch (error) {
                console.log(error.message);           
            }
    });

        ws.on('close', function() {
            delete wsClients[id];
        })
    });


    client.connectTCP("95.158.47.15", { port: 502 });
    //client.connectTCP(tcpPort, { port: 502 });
    client.setID(1);

    let periodicPollingHandler = setInterval(function() {
        //PromiseAPI
        try {
            client.readHoldingRegisters(BLOCK_START, BLOCK_SIZE).then(data => {
                const _answer = data.data;
            const floats = m340.getFloatsFromMOdbusCoils(_answer);
            m340data = floats;
            eco1.forEach((el, index) => {
                m340data[50 + index] = parseFloat(el);
            });
           // console.log("eco1", eco1.length, eco1);
        const socketMessage = {};
        socketMessage.data = JSON.stringify(floats.map(el => 
            isFinite(Number(el)) ? el.toFixed(3) : "NaN")
            );

            timestamps[1] =  (new Date()).toISOString();
            // console.log(timestamps);
            socketMessage.timestamps = JSON.stringify(timestamps.map(tm => getDateTimeStringCurrent (tm)));

            io.sockets.emit('newdata', socketMessage);
        });
        } catch (error) {
            console.log(error.message);
            
        }
    
    }, 2000);


    //const io = require('socket.io');
    const io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket, username) {
        socket.emit('message', 'You are connected!');
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('little_newbie', function(username) {
            socket.username = username;
        });
        socket.on('message', function (message) {
            console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);
        }); 
    });
    io.sockets.on('newdata', function (socket, username) {
        socket.broadcast.emit('newdata', m340data);

    });

}

function getDateTimeStringCurrent (dt) {
    //return dt.toISOString().slice(0, 19).replace('T', ' ');
    return (new Date ((new Date((new Date(new Date(dt))).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = dataCollect;