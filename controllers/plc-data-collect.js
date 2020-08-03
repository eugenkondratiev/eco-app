const timestamps = [];
const fs= require('fs');

//it`s consciously global
wsClients = {};
const updateEco1 = require('./model/eco1-update-last-day');
const logTask = require('../tasklog');

function dataCollect(server) {

    const client = require('./plc-client')();

    //:TODO divide to 2-3 modules
    // var TcpPort = require("modbus-serial").TcpPort;
    // var tcpPort = new TcpPort("192.168.1.225");
    // var ModbusRTU = require("modbus-serial");


    // client = new ModbusRTU(tcpPort);

    const BLOCK_START = 3200;
    const BLOCK_SIZE = 100;

    const m340 = require('./m340read');
    // const bits = require('./bit-operations');
    // bits.addBinFunctions();

    let handler = 0;

    let m340data = require('../public/data/m340data');

    let eco1 = [];
    let eco3 = [];

    const WebSocketServer = new require('ws');
    //const wsClients = {};
    const webSocketServer = new WebSocketServer.Server({
        port: 8081
    });

    webSocketServer.on('connection', function (ws) {
        let id = Math.random();
        wsClients[id] = ws;

        ws.on('message', async function (message) {
            ;
            try {
                const jsonMessage = JSON.parse(JSON.parse(JSON.stringify(message)));
                if (jsonMessage.eco1) {
                    eco1 = jsonMessage.eco1;
                    timestamps[0] = jsonMessage.timestamp;
                }
                if (jsonMessage.eco3) {
                    eco3 = jsonMessage.eco3;
                    timestamps[2] = jsonMessage.timestamp;
                }

                if (jsonMessage.lastDayEco1) {
                    // const logRecord = new Date() + " " +  + '\n';
                    logTask(1, (' reseived last day array message\n' + + jsonMessage.lastDayEco1.length + " rows \n"));
                    // logTask(1, (' reseived last day array message\n' + Array.isArray(jsonMessage.lastDayEco1) + " _ " + + jsonMessage.lastDayEco1.length + " _ \n"+ jsonMessage.lastDayEco1));
                    // fs.appendFile('logs/update_day_eco1.txt', logRecord, err => {
                    //     if (err) console.error
                    // });
                    
                    const updateResult = await updateEco1(jsonMessage.lastDayEco1);
                    logTask(1, (' update result : ' + updateResult + " _ \n"));

                }
                // console.log(eco1);
            } catch (error) {
                console.log(error.message);
            }
        });

        ws.on('close', function () {
            delete wsClients[id];
        })
    });

    // client.connectTCP("95.158.47.15", { port: 502 });
    // //client.connectTCP(tcpPort, { port: 502 });
    // client.setID(1);

    let periodicPollingHandler = setInterval(function () {
        //PromiseAPI
        try {
            client.readHoldingRegisters(BLOCK_START, BLOCK_SIZE).then(data => {
		try{
                const _answer = data.data;
                const floats = m340.getFloatsFromMOdbusCoils(_answer);
                m340data = floats;
                eco1.forEach((el, index) => {
                    m340data[50 + index] = parseFloat(el);
                });
                console.log("eco3", eco3.length, eco3);
                eco3.forEach((el, index) => {
                    m340data[100 + index] = (index < 30 ) ? parseFloat(el) : parseInt(el);
                });
                const socketMessage = {};
                socketMessage.data = JSON.stringify(floats.map(el =>
                    isFinite(Number(el)) ? el.toFixed(3) : "NaN"));

                timestamps[1] = (new Date()).toISOString();
                // console.log(timestamps);
                socketMessage.timestamps = JSON.stringify(timestamps.map(tm => getDateTimeStringCurrent(tm)));

                io.sockets.emit('newdata', socketMessage);
		} catch (e) {
			console.log("#### readHoldingRegisters results handle Error ", e)	
		}
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
        socket.on('little_newbie', function (username) {
            socket.username = username;
        });
        socket.on('message', function (message) {
            console.log(socket.username + ' sent a message! They\'re saying: ' + message);
        });
    });
    io.sockets.on('newdata', function (socket, username) {
        socket.broadcast.emit('newdata', m340data);

    });

}

function getDateTimeStringCurrent(dt) {
    return (new Date((new Date((new Date(new Date(dt))).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = dataCollect;