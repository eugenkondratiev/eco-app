
const dbQuery = require('./db-local').dbQuery;

const getLastDay = require('../get-last-day').getLastDayString;

const sqlLastDayHours = `select count(dt) as hours FROM eco.hourseco1 where date(dt)='${getLastDay()}'`;

// async function main() {

//     try {

//         const lastDayHours = (await dbQuery(sqlLastDayHours)).rows[0][0];
//         console.log(lastDayHours);
//         return lastDayHours;


//     } catch (err) {
//         console.log("Check Eco1 last day hours problem", err)

//     }
// }



module.exports = function() {
    return new Promise(async (res, rej)=> {
        try {

            const lastDayHours = (await dbQuery(sqlLastDayHours)).rows[0][0];
            console.log(lastDayHours);
            res(lastDayHours);
    
    
        } catch (err) {
            console.log("Check Eco1 last day hours problem", err)
            rej("Check Eco1 last day hours problem");
        }
    })
};