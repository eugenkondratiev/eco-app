const base = require('./report-base');
// const mysqlConnection = require('./connection');

class Eco1MonthReport extends base {
    constructor(reportMonth, reportYear) {
        super();
        this.reportMonth = reportMonth || 8;
        this.reportYear = reportYear || 2019;
        
        //this.con = self.con; // db connection
        this.con = require('./connection')();
        // this.con = require('./connection');

        this.HEADER = ["Дата", "Тепло, Гкал", "Расход воды, м3", "Темп. на город, С", "Темп. оборотной, С",  "Давление после котла, МПа", "Давление до котла, МПа", "Темп. дымовых до ЭКО, С", "Разрежение в топке, Па" ];
        this.getTitle = this.getMonthTitle;
        this.eco = 1;

    }
    //-----------------------------------------------------------------
    tableHeader() {
        return "<tr>" + this.HEADER.map(el => "<th>" + el + "</th>").join("") + "</tr>";
    }
    //==============================================================================

//========================================================================================
    getDayReportSql(day) {
        return  `SELECT dt, sum(w_38), sum(q_39),  avg(T_41), avg(T_42), avg(P_19), avg(P_18), avg(T_10), avg(P_36)
        FROM eco.hourseco1 where dt between '${day}' and DATE_ADD('${day}', INTERVAL 23 hour);`;
        
    }
    //========================================================================================
    monthDatesSql(month , year) {
        const mm = this.getNiceMonth(month);
        return `select distinct DATE_ADD(DATE(dt), INTERVAL 8 hour) as dtm  from eco.hourseco1 where month(dt) ='${mm}' and year(dt) = '${year}' `;//order by dt asc` ; 
    }

 //========================================================================================
    // getMonthReport(/*self.con,*/ _reportMonth = 7, _reportYear = 2019) {
    getMonthReport(/*self.con,*/ reportMonth = 7, reportYear = 2019) {
        // const reportMonth = _reportMonth || 2;
        // const reportYear = _reportYear  || 2019 ;
        let DaysArray = [];
        const self = this;
        console.log("reportMonth, reportYear - ", this.reportMonth, this.reportYear, reportMonth, reportYear);

        return new Promise((resolve, reject) => {
                    
            self.con.connect(function(err) {
                // let DaysArray = [];
    
                try {
                    if (err){
                        console.log(' con.connect BD connect error: ' + err.message);
                        console.log(" err BD state = "+ self.con.state);
                        self.con.end();
                        reject(' con.connect BD connect error: ' + err.message);
                        //throw err;
                        } else {
                            console.log("Connected!  BD state = "+ self.con.state);
                            self.getDaysList(/*self.con,*/ self.reportMonth, self.reportYear)
                            .then(function(result){ 
                                console.log("getDaysList . then ->", JSON.stringify(result));

                                DaysArray = self.arrFromObjectArrray(result, "dtm");
                                const daysInMonth = DaysArray[DaysArray.length - 1].slice(8, 10);
                                // console.log(daysInMonth);   
                                return   new Promise((res,  rej) => {
                                    res(DaysArray);
                                });    
                            })
                            .catch(function(e){                    
                                if (e.message == "Cannot read property 'slice' of undefined") {
                                    //console.log(e.message);
                                    console.log("\nДанные за этот период отсутствуют или ошибочны"); 
                                     
                                }
                                console.log(e.message);
                                self.con.end();
                                // reject("\nДанные за этот период отсутствуют или ошибочны");
                                reject(self.formErrorResponse.call(self, "Данные за этот период отсутствуют или ошибочны"));                                
                            })
                            .finally( function(){                                
                                self.forEachDay(DaysArray/*, con*/)
                                .then(table => {
                                    // console.log(table);
                                    const answer = {};
                                    answer.tytle = self.getTitle();
                                    
                                    // answer.tytle = self.getTitle(reportDay , reportMonth, reportYear);
                                        answer.eco = self.eco;
                                        answer.data = table
                                    resolve(answer);
                                });
                                
                                
                            }
                            );
                        }             
                } catch (err) {
                    console.log("getMonthReport main promise error - ", err.message, err);
                    self.con.end();
                    const error = ' con.connect BD connect error: ' + err.message;
                    reject({err: error});
                }
            });
    
            self.con.on('error', function(err) {
                const error = 'con.on BD error: ' + err.message;
                console.log(error);
                console.log(" err BD state = "+ self.con.state);
                reject({err: error});

            });
        });
    };
    //-----------------------------------------------------------------
//==============================================================================
    getDaysList(/*_con,*/ mm = 7, year = 2019){
            const self = this;

        return new Promise( function(resolve, reject){
            function performQuery(mm , year){
                const sql = self.monthDatesSql(mm , year);
                console.log("getDaysList sql ", sql);
                
                let query = self.con.query(sql,  [], function (err, result, fields) {
                    if (err) {
                        console.log(err.message);
                        reject(err);
                    } else {
                        // console.log(" getDaysList result ", result);                        
                        resolve(result);
                    }
                });
            };
            if (self.con.state === 'disconnected'){
                self.con.connect(function(err) {
                    if (err){
                    console.log('BD connect error: ' + err.message);
                    self.con.end();
                    //throw err;
                    } else {
                        performQuery(mm, year);
                    console.log("RE-Connected! BD state = "+ self.con.state);
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

    forEachDay(_DaysArray /*, _.con*/){
        let sequence = Promise.resolve();
        const allData =[];
        let htmlArr = [];
        const self = this;
    // -----------------------------------------------------------------------
        return new Promise((res, rej) => {
            try {
                _DaysArray.forEach(function(day, i, arr){
                    sequence = sequence.then(function(){
                        return self.getDayRow(day);
                    })
                    .then(function(dayRow){
                        allData.push( self.dressUpDayRow(dayRow));
                        if (i === arr.length - 1) {
                        //console.log(allData);
                            self.con.end();
                            allData.push(self.calcMonthData(allData));
                            const htmlTable = self.tableHeader() + self.arrToTableRow(allData);
                            // const htmlTable = self.getTableHeader() + self.arrToTableRow(allData);
                            res(htmlTable);
                        }
                    });
                });           
            } catch(e) {
                console.log(e.message); 
            } finally {
                ;
            }    
        });

    }
    //========================================================================================
    getDayRow(day/*, _con*/){
        const self = this;
            return new Promise(function(resolve, reject){
                function performQuery(day) {
                    const sql = self.getDayReportSql(day );
                // console.log(` getDayRow ${day} - ${sql}`);            
                    let query = self.con.query(sql,  [], function (err, result, fields) {
                        if (err) {
                            console.log(err.message);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                        }); 
                };
                if (self.con.state === 'disconnected'){
                    self.con.connect(function(err) {
                        if (err){
                        console.log('BD connect error: ' + err.message);
                        self.con.end();
                        //throw err;
                        } else {
                            performQuery(day);
                        console.log("RE-Connected! BD state = "+ self.con.state);
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


}


module.exports = Eco1MonthReport;