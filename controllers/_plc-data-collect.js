const timestamps = [];

const client = require('./plc-client')();
// console.log("_plc-data-collect.js",client);

     const BLOCK_START = 3200;
    const BLOCK_SIZE = 100;

    const LAST_DAY_BLOCK_START = 9400;
    const CURRENT_DAY_BLOCK_START = 9400;
    const HOUR_BLOCK_SIZE = 100;  

    const m340 = require('./m340read');


    let m340data = require('../public/data/m340data');



setInterval(function(e) {
    try {
const _client = require('./plc-client')();
        // console.log("last hour  - ", _client);
        const curHour = 15;
        const lastHourStart = CURRENT_DAY_BLOCK_START + HOUR_BLOCK_SIZE * curHour;
        _client.readHoldingRegisters(lastHourStart, BLOCK_SIZE)
        .then(data => {
            const _answer = data.data;            
            const floats = m340.getFloatsFromMOdbusCoils(_answer);
            // console.log("last hour  - ",curHour, floats.slice(0, 5));

        })
    } catch (error) {
        console.log(error.message);
    } finally {
        
    };
},5000);

    let periodicPollingHandler = setInterval(function() {
        //PromiseAPI
        try {
            client.readHoldingRegisters(BLOCK_START, BLOCK_SIZE).then(data => {
                const _answer = data.data;
            const floats = m340.getFloatsFromMOdbusCoils(_answer);
            m340data = floats;
            console.log("m340data.slice(0, 5) - ", m340data.slice(0, 5));
            // eco1.forEach((el, index) => {
            //     m340data[50 + index] = parseFloat(el);
            // });


           // console.log("eco1", eco1.length, eco1);
        // const socketMessage = {};
        // socketMessage.data = JSON.stringify(floats.map(el => 
        //     isFinite(Number(el)) ? el.toFixed(3) : "NaN")
        //     );

        //     timestamps[1] =  (new Date()).toISOString();
        //     // console.log(timestamps);
        //     socketMessage.timestamps = JSON.stringify(timestamps.map(tm => getDateTimeStringCurrent (tm)));

        //     io.sockets.emit('newdata', socketMessage);
        });
        } catch (error) {
            console.log(error.message);
            
        }
    
    }, 3000);

function getDateTimeStringCurrent (dt) {
    return (new Date ((new Date((new Date(new Date(dt))).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
}
