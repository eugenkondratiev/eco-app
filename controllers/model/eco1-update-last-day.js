;
const ROWS_ARRAY = [`dt`, `Q_39`, `T_41`, `T_42`, `P_19`, `P_18`, `P_36`, `T_10`, `T_6`, `T_7`, `T_4`, `W_38`];
const dbQuery = require('./db-local').dbQuery;

function getDuplicateUpadateString(rec, rows) {
    const keyupdate = (acc, key, index, arr) => {
        return acc + `  ${key} = VALUES(${key})` + (index < arr.length - 1 ? `,` : ``);
    }
    const noDate = rows;
    noDate.shift();
    const ins = "INSERT INTO eco.hourseco1 (`dt`, `Q_39`, `T_41`, `T_42`, `P_19`, `P_18`, `P_36`, `T_10`, `T_6`, `T_7`, `T_4`, `W_38`) VALUES ? "
    const str = " ON DUPLICATE KEY UPDATE";
    const dupStr = noDate.reduce(keyupdate, str);
    return ins + dupStr;
}
const OK = true;
const FAIL = false;

async function main(dayData) {

    try {
        // require('fs').writeFile('logs/update_' + getLastDay() + '.json', JSON.stringify(answer, ' '), err => { if (err) console.error });

        const _sql = getDuplicateUpadateString([], ROWS_ARRAY);
        const rlt = await dbQuery(_sql, dayData);

        console.log("rlt - ", rlt);
        return OK;

    } catch (err) {
        console.log("Eco1 last day update problem", err)
        return FAIL;
    }
}

// main();

module.exports = main;