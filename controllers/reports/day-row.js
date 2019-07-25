const dtUtils = require('./date-utils');
//==============================================================================
module.exports = getDayRow;

function getDayRow(day, _con){
    return new Promise(function(resolve, reject){
        function performQuery(day) {
            const sql = dtUtils.getDayReportSql(day );
           // console.log(sql);            
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
                    performQuery(day);
                console.log("RE-Connected! BD state = "+ _con.state);
                }               
            });
        } else {
            try {
            performQuery(day);
            } catch(e) {
                console.log("SQL insert problem" + e.message );
            } finally {
                ;
            }
        };
    });
};