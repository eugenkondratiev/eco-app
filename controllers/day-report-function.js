
    const con = require('./connection');
    const dtUtils = require('./node-modules/date-utils');
    const stringTemplates = require('./node-modules/string-templates');

    const getHoursList = require('./node-modules/hours-list');

function getDayReport(_con, reportDay = 15, reportMonth = 7, reportYear = 2019) {
     return new Promise(function(resolve, reject) {
    let hoursArray =[];
    
    _con.connect(function(err) {
        if (err){
        console.log(' con.connect BD connect error: ' + err.message);
        console.log(" err BD state = "+ con.state);
        _con.end();
        reject(' con.connect BD connect error: ' + err.message);
        } else {
            console.log("Connected!  BD state = "+ _con.state);
            getHoursList(con, reportDay, reportMonth, reportYear)
            // getHoursList(reportDay, reportMonth, reportYear)
            .then(function(result) {
                ;
                try {
                    hoursArray = result.map(function(row, i, arr) {
                        return stringTemplates.formHourRow(row);
                    });                               
                } catch (e) {
                    console.log(e.message);
                } finally {
                ;                
                }
                return new Promise(function(resolve, reject) {
                    resolve(hoursArray);
                })        
            })
            .catch(function(e) {
                console.log(e.message); 
            })
            .finally( function(result) {
                //forEachHour(hoursArray);
                try {   
                    _con.end();    
                            if (hoursArray.length < 1) {
                                console.log("\nДанные за этот период отсутствуют или ошибочны");
                                reject("\nДанные за этот период отсутствуют или ошибочны");
                                // return "\nДанные за этот период отсутствуют или ошибочны";
                            } else {

                                resolve(stringTemplates.arrToTableRow(hoursArray));
                                // return dtUtils.arrToTableRow(hoursArray);
                            }
                        } catch (e) {
                                    console.log(e.message); 
                                    reject(e.message)
                        } finally {
                                    ;
                        }
            }

            );
        }   
    });

    _con.on('error', function(err) {
        console.log('con.on BD error: ' + err.message);
        console.log(" err BD state = "+ con.state);
        reject('con.on BD error: ' + err.message)
    });
    {
    // //==============================================================================
    //===============================================================================
    }
});
}


getDayReport(con, 15, 7, 2019).then((result) => {
    console.log("result table: \n" , result);
    
})
.catch((err) => {
    console.log(err)
});

module.exports = getDayReport;



