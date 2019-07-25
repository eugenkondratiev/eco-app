const dtUtils = require('./date-utils');
//==============================================================================
function getHoursList(_con, dd = 20, mm = 1, year = 2019){
    return new Promise( function(resolve, reject){
        function performQuery(dd, mm , year){
            const sql = dtUtils.dayReportSql(dd, mm , year);
            console.log("sql = ", sql);
            
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
                try {
                    if (err){
                        console.log('BD connect error: ' + err.message);
                        _con.end();
                        //throw err;
                        } else {
                            performQuery(dd, mm, year);
                        console.log("RE-Connected! BD state = "+ _con.state);
                        }                                            
                } catch (e) {
                    console.log("SQL access problem : " + e.message );
                    //_con.end();
                }
            });
        } else {
            try {               
            performQuery(dd, mm, year);
            } catch(e) {
                console.log("SQL access problem : " + e.message );
            } finally {
                ;
            }
        };
    });
}

module.exports = getHoursList;