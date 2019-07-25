
module.exports = getDaysList;

const dtUtils = require('./date-utils');

//==============================================================================
function getDaysList(_con, mm = 1, year = 2019){
    return new Promise( function(resolve, reject){
        function performQuery(mm , year){
            const sql = dtUtils.monthDatesSql(mm , year);
            let query = _con.query(sql,  [], function (err, result, fields) {
                if (err) {
                    console.log(err.message);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        };
        if (_con.state === 'disconnected'){
            _con.connect(function(err) {
                if (err){
                console.log('BD connect error: ' + err.message);
                _con.end();
                //throw err;
                } else {
                    performQuery(mm, year);
                console.log("RE-Connected! BD state = "+ _con.state);
                }                
            });
        } else {
            try {
            performQuery(mm, year);
            } catch(e) {
                console.log("SQL insert problem" + e.message );
            } finally {
                ;
            }
        };
    });
}
    //==============================================================================