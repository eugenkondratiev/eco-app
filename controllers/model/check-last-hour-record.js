const dbQuery = require('./db-local').dbQuery;


function checkLastHour(_eco) {
//==============================================================================
function getDateTimeFromMySql (dt) {
    //return dt.toISOString().slice(0, 19).replace('T', ' ');
    return (new Date ((new Date((new Date(new Date(dt))).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
}
//==============================================================================

    //---------------------------------------------------------------
    // function getCurrentHourString() {
    //     // console.log(getDateTimeFromMySql (testHour));
    //     const curHour = new Date(); 
    //     const curHourForBD = getDateTimeFromMySql(curHour).slice(0,-6).concat(':00:00');
    //      return curHourForBD
    // }
    //-------------------------------------------------------------

    const eco = _eco || 2;
    const testHour = '2019-10-25 11:00:00';
    const fs = require('fs');

    return new Promise((res, rej) => {
        const curDateTime = new Date(); 
        
        // const curHourCutted = getDateTimeFromMySql(curHour).slice(0,-6);
        const lastHour = getDateTimeFromMySql(curDateTime).slice(0,-6).concat(':00:00');
        const curHour = curDateTime.getHours();
         console.log(curHour, typeof curHour);
        // const lastHour = testHour;
        
        const _sql = `SELECT * FROM eco.hourseco${eco} where dt = '${lastHour}';`;
        dbQuery(_sql)
        .then(response => {
            // console.log(response.rows);
            if (response.rows < 1) {
            const logRecord = new Date() +  'last hour data missing found \n\r';
             fs.appendFile('./logs/dbconnectrerrors.txt', logRecord, err=>{if (err) console.error('file error - ',err)});

             res({missed : true, hour : curHour})
            }
            res({missed : false, hour : curHour})
        })
        .catch(err => {
             console.log('sql err -', err);
             
             const logRecord = new Date() +  ' db connection error\n\r';
             fs.appendFile('./logs/dbconnectrerrors.txt', logRecord, err=>{if (err) console.error('file error - ',err)});

            rej(err)
        })
    })
}


module.exports = checkLastHour;