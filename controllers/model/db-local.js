const dbPool = require('./connection-pool-eco')();


function dbExecute(_sql, values) {
    // console.log("_sql :  ", _sql);

    return new Promise((resolve, reject) => {
            dbPool.execute( {
                rowsAsArray: true,
                sql: _sql 
                }
                , 
                [values],
                 function(err, rows, fields){
                    if (err) reject(err);
                    resolve({rows, fields})               
                }
            );
    })
}

function dbQuery(_sql, values) {
    console.log("_sql :  ", _sql);

    return new Promise((resolve, reject) => {
            dbPool.query( {
                rowsAsArray: true,
                sql: _sql 
                }
                , 
                [values],
                 function(err, rows, fields){
                    if (err) {
                        console.log('dbQuery error !!!!!  ', _sql);
                        reject(err)
                    };
                    resolve({rows, fields})               
                }
            );
    })
}

module.exports = { dbQuery: dbQuery,
    dbExecute: dbExecute 
};
