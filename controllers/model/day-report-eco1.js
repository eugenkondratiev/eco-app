const base = require('./report-base');
// const mysqlConnection = require('./connection');

class Eco1DayReport extends base {
    constructor() {
        super();
        //this.con = _con; // db connection
        this.con = require('./connection')();
        // this.con = require('./connection');

        this.HEADER = ["Дата", "Тепло, Гкал", "Расход воды, м3", "Темп. на город, С", "Темп. оборотной, С",  "Давление после котла, МПа", "Давление до котла, МПа", "Темп. дымовых до ЭКО, С", "Разрежение в топке, Па" ];
        this.getTitle = this.getDayTitle;
        this.eco = 1;

    }
    //-----------------------------------------------------------------
    tableHeader() {
        return "<tr>" + this.HEADER.map(el => "<th>" + el + "</th>").join("") + "</tr>";
    }
    
    //-----------------------------------------------------------------
    //==============================================================================
    getDayReportSql(day, month , year) {
        const startDay = this.formDayStr(day, month , year);
        return  `SELECT dt, w_38, q_39, T_41, T_42, P_19, P_18, T_10, P_36  FROM eco.hourseco1 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
}

    //-----------------------------------------------------------------
    getHoursList(/*_con ,*/ dd = 20, mm = 1, year = 2019){
        const self = this;
            
        return new Promise( function(resolve, reject){
            function performQuery(dd, mm , year){
                const sql = self.getDayReportSql(dd, mm , year);
                console.log("sql = ", sql);
                
                let query = self.con.query(sql,  [], function (err, result, fields) {
                    if (err) {
                        console.log(err.message);
                        reject(err);
                    } else {
                        // console.log("days query result = ", result);
                        
                         resolve(result);
                    }
                });
            };
            
            if (self.con.state === 'disconnected'){
                self.con.connect(function(err) {
                    try {
                        if (err){
                            console.log('BD connect error: ' + err.message);
                            self.con.end();
                            //throw err;
                            } else {
                                performQuery(dd, mm, year);
                            console.log("RE-Connected! BD state = "+ self.con.state);
                            }                                            
                    } catch (e) {
                        console.log("SQL access problem : " + e.message );
                        reject(e);
                        //self.con.end();
                    }
                });
            } else {
                try {               
                performQuery(dd, mm, year);
                } catch(e) {
                    
                    console.log("SQL access problem : " + e.message );
                    reject(e);
                } finally {
                    ;
                }
            };
        });
    }
    //-----------------------------------------------------------------    
    getDayReport(/*_con,*/ reportDay = 15, reportMonth = 7, reportYear = 2019) {
        const self = this;

        return new Promise(function(resolve, reject) {
        let hoursArray =[];
        
        self.con.connect(function(err) {
            if (err){
                console.log(' con.connect BD connect error: ' + err.message);
                console.log(" err BD state = "+ self.con.state);
                self.con.end();
                reject(' con.connect BD connect error: ' + err.message);
            } else {
                console.log("Connected!  BD state = "+ self.con.state);
                self.getHoursList(/*con,*/ reportDay, reportMonth, reportYear)
                // getHoursList(reportDay, reportMonth, reportYear)
                .then(function(result) {
                    ;
                    try {
                        hoursArray = result.map(function(row, i, arr) {                                                     
                            return self.formHourRow(row);
                        }); 

                                                      
                    } catch (e) {
                        console.log(e.message);
                    } finally {

                        return new Promise(function(res, rej) {
                            // console.log("finally hours array 1 = ", hoursArray);
                            res(hoursArray);
                        });            
                    };                           
                })
                .catch(function(e) {
                    console.log("catch in getDayReport -> self.con.connect :", e, e.message); 
                    reject({err: "\nДанные за этот период отсутствуют или ошибочны"});
                })
                .finally( function(result) {
                    //forEachHour(hoursArray);
                    // console.log("hours array finally = ", hoursArray);

                    // console.log("result array finally = ", result);

                    try {   
                        // self.con.end();    
                                if (hoursArray.length < 1) {
                                    console.log("\nДанные за этот период отсутствуют или ошибочны");
                                    reject({err: "\nДанные за этот период отсутствуют или ошибочны"});
                                    // return "\nДанные за этот период отсутствуют или ошибочны";
                                } else {
                                    // console.log("hours array 2 = ", hoursArray);
                                    const answer = {};
                                        answer.tytle = self.getTitle(reportDay , reportMonth, reportYear);
                                        answer.eco = self.eco;

                                    answer.data = self.tableHeader() + self.arrToTableRow(hoursArray);
                                    // console.log("answer", answer);

                                    // console.log("resolve(self.arrToTableRow(hoursArray)); ", answer);
                                    // console.log(result);
                                    
                                   resolve(answer);
                                    
                                    // resolve(self.arrToTableRow(hoursArray));

                                    // return dtUtils.arrToTableRow(hoursArray);
                                }
                            } catch (e) {
                                        console.log(e.message); 
                                        reject({err: e.message});
                            } finally {
                                console.log("self.con.stat - ", self.con.state);
                                
                                self.con.end(); 
                            }
                }

                );
            }   
        });

        self.con.on('error', function(err) {
            const error = 'con.on BD error: ' + err.message
            console.log(error);
            console.log(" err BD state = "+ self.con.state);
            reject({err: error});
        });
        {
        // //==============================================================================
        //===============================================================================
        }
        });
    }
    //-----------------------------------------------------------------

}


module.exports = Eco1DayReport;