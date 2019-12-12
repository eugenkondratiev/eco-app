const _client = require('./plc-client')();

function readHourFormPlc(_hour) {
    return new Promise((res, rej) => {

    //   console.log(_client);  
     const BLOCK_START = 3200;
     const BLOCK_SIZE = 100;
 
     const LAST_DAY_BLOCK_START = 7000;
     const CURRENT_DAY_BLOCK_START = 9400;
     const HOUR_BLOCK_SIZE = 100;  
 
     const m340 = require('./m340read');
 
        setTimeout(function() {
            try {
                const curHour = _hour || 10;
                console.log("hour", curHour);
                const hoursArray =  _hour == 7 ? LAST_DAY_BLOCK_START : CURRENT_DAY_BLOCK_START;
                const lastHourStart = hoursArray + HOUR_BLOCK_SIZE * curHour;
        
                _client.readHoldingRegisters(lastHourStart, BLOCK_SIZE)
                .then(data => {
                    const _answer = data.data;            
                    const floats = m340.getFloatsFromMOdbusCoils(_answer);
                    // console.log("last hour  - ",curHour, floats.slice(0, 5));
                    //get only what needed;
                    const sqlData = getMainParameters(floats);
                    res(sqlData);
                })
                .catch(err => {
                    if (err) {
                        console.log("read.error", err);
                        rej(err.message)
                    };
        
                 })
             } catch (error) {
                 rej(error.message)
             };
        }, 2000)
    })
}

//------------------------------------------
function getMainParameters(hourRow) {
         //   INSERT INTO `eco`.`hourseco2` 
         //(`id`, `dt`, `Q_39`, `T_41`, `T_42`, `P_19`, `P_18`, `P_21`, `T_10`, `P_34`, `T_7`, `T_3`, `T_5`, `W_38`) 
         //VALUES ('', '2019-10-25 11:00:00', '117.58', '64.0159', '53.4747', '0.345991', '0.380945', '-20.0209', '174.791', '1.98299', '68.6284', '72.7956', '61.6206', '1.18059');
         const arr = hourRow.slice(0,7);
         arr.push(hourRow[11]);//P_34
         arr.push(hourRow[7]); // T_7
         arr.push(hourRow[9]); // T_3
         arr.push(hourRow[10]); // T_5
         arr.push(hourRow[8]); // W_38
        // console.log("arr   -" , arr)
         return arr;

}


module.exports = readHourFormPlc;
    // readHourFormPlc(16)
    //     .then(resp=> {console.log("resp", resp)})
    //     .catch(err=>{console.log(err)});

