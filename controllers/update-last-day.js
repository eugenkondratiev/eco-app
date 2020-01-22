/**
 * 
 * TODO
 * сделать проверку "за вчера"  и проверку "прошлого часа"
 * и если вчера менее 24 записей , то тянуть весь массив и писать в базу.
 * и если нет прошлого часа - то читать и класть в базу только прошлій час.
 */

const _client = require('./plc-client')();
const LAST_DAY = true;
const dbQuery = require('./model/db-local').dbQuery;
// const dbExecute = require('./model/db-local').dbExecute;
// const con = require('./model/connection')();

function readHourFromPlc(_hour, _last) {
    return new Promise((res, rej) => {

        //   console.log(_client);  
        const BLOCK_START = 3200;
        const BLOCK_SIZE = 100;

        const LAST_DAY_BLOCK_START = 7000;
        const CURRENT_DAY_BLOCK_START = 9400;
        const HOUR_BLOCK_SIZE = 100;

        const m340 = require('./m340read');

        setTimeout(function () {
            try {
                const curHour = _hour || 10;
                // console.log("hour", curHour);

                // const hoursArray = _hour == 7 ? LAST_DAY_BLOCK_START : CURRENT_DAY_BLOCK_START;
                const hoursArray = (_hour == 7 || _last) ? LAST_DAY_BLOCK_START : CURRENT_DAY_BLOCK_START;

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
    const arr = hourRow.slice(0, 7);
    arr.push(hourRow[11]);//P_34
    arr.push(hourRow[7]); // T_7
    arr.push(hourRow[9]); // T_3
    arr.push(hourRow[10]); // T_5
    arr.push(hourRow[8]); // W_38
    // console.log("arr   -" , arr)
    return arr.map(el => el.toFixed(5));

}
const ROWS_ARRAY = [`dt`, `Q_39`, `T_41`, `T_42`, `P_19`, `P_18`, `P_21`, `T_10`, `P_34`, `T_7`, `T_3`, `T_5`, `W_38`];

function getDuplicateUpadateString(rec, rows) {
    const keyupdate = (acc, key, index, arr) => {
        return acc + `  ${key} = VALUES(${key})` + (index < arr.length - 1 ? `,` : ``);
    }
    const noDate = rows;
    noDate.shift();

    const ins = "INSERT INTO eco.hourseco2 (`dt`, `Q_39`, `T_41`, `T_42`, `P_19`, `P_18`, `P_21`, `T_10`, `P_34`, `T_7`, `T_3`, `T_5`, `W_38`) VALUES ? "
    const str = " ON DUPLICATE KEY UPDATE";
    //ON DUPLICATE KEY UPDATE name = VALUES(name), rank = VALUES(rank)
    const dupStr = noDate.reduce(keyupdate, str);
    return ins + dupStr;
}


// const getLastDayHourString = (i) => `2019-12-26 ${i}:00:00`;
const getLastDayHourString = require('./get-last-day').getLastDayHourString;
const getLastDay = require('./get-last-day').getLastDayString;
const sqlLastDayHours = `select count(dt) as hours FROM eco.hourseco2 where date(dt)='${getLastDay()}'`;

async function main() {

    try {

        const lastDayHours = (await dbQuery(sqlLastDayHours)).rows[0][0];
        console.log(lastDayHours);
       if (lastDayHours===24) return;

        const answer = [];
        for (let i = 0; i < 24; i++) {
            const resp = await readHourFromPlc(i, LAST_DAY);
            resp.unshift(getLastDayHourString(i));
            // console.log("resp " + i + " ", resp);
            answer.push(resp)
        }
        const logRecord = new Date() + " " +   ' last  day UPDATED\n';
        require('fs').appendFile('../logs/update_day_eco2.txt', logRecord, err => { if (err) console.error });
        
        // require('fs').appendFile('logs/update_day_eco2.json', JSON.stringify(getLastDay(), ' '), err => { if (err) console.error });

        const _sql = getDuplicateUpadateString([], ROWS_ARRAY);
        const rlt = await dbQuery(_sql, answer);

        // console.log("rlt - ", rlt);


    } catch (err) {
        console.log("Main problem", err)

    }
}

// main();

module.exports = main;