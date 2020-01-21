/**
 * планы.
 * 1. done Сделать цепочку промисов красивее.  Пока что получается смесь промисов и колбекадового кода
 * 2. done Разбить на модули. и сделать экспорт.
 * 3. done Вынести строку подключения к базе в модуль, и скрыть гитигнором.
 * 4. done Попробовать получать общие даннные за месяц не новым запросом, а обработкой полученого массива дневных данных
 * 5.  done Пока не сделал серверную часть, попробовать создавать html файл отчета по старинке, выводом в файл потоком. 
 * 6. done Убрать лишние и сетовіе функции.
 */
const ECO1 = 1;
const ECO2 = 2;
const MONTH_REPORT = 2;
const DAY_REPORT = 1;

const { spawn } = require('child_process');
const fs = require("fs");
// const HTML_PATH = "bigdata/html/";
const con = require('./connection');

const dtUtils = require('./node-modules/date-utils');

// const stringTemplates = require('./node-modules/string-templates');
// const getHtml = require('./node-modules/html-templates');
// const dataHandle = require('./node-modules/data-handlers');


const getDaysList = require('./node-modules/days-list');

const forEachDay = require('./node-modules/days-table');

//==============================================================================

function getMonthReport(_con, _reportMonth = 7, _reportYear = 2019) {
    const reportMonth = _reportMonth || 2;
    const reportYear = _reportYear  || 2019 ;
    let DaysArray = [];

    return new Promise((resolve, reject) => {
                
        _con.connect(function(err) {
            // let DaysArray = [];

            try {
                if (err){
                    console.log(' con.connect BD connect error: ' + err.message);
                    console.log(" err BD state = "+ _con.state);
                    _con.end();
                    reject(' con.connect BD connect error: ' + err.message);
                    //throw err;
                    } else {
                        console.log("Connected!  BD state = "+ _con.state);
                        getDaysList(_con, reportMonth, reportYear)
                        .then(function(result){
                            DaysArray = dtUtils.arrFromObjectArrray(result, "dtm");
                            const daysInMonth = DaysArray[DaysArray.length - 1].slice(8, 10);
                            console.log(daysInMonth);   
                            return   new Promise((res,  rej) => {
                                res(DaysArray);
                            });    
                        })
                        .catch(function(e){                    
                            if (e.message == "Cannot read property 'slice' of undefined") {
                                //console.log(e.message);
                                console.log("\nДанные за этот период отсутствуют или ошибочны"); 
                                 
                            }
                            con.end();
                            reject("\nДанные за этот период отсутствуют или ошибочны");
                            
                        })
                        .finally( function(){
                            const options = {
                                reportMonth : reportMonth,
                                reportYear :  reportYear,
                                ECO1: ECO1, 
                                MONTH_REPORT : MONTH_REPORT
                            };
                            
                            forEachDay(DaysArray, con, options)
                            .then(table => {
                                // console.log(table);
                                resolve(table);
                            });
                            
                            
                        }
                        );
                    }             
            } catch (error) {
                console.log(error.message);
                con.end();
                reject(' con.connect BD connect error: ' + err.message);
            }
        });

        _con.on('error', function(err) {
            console.log('con.on BD error: ' + err.message);
            console.log(" err BD state = "+ _con.state);
            reject(err);
        });
    });
};




getMonthReport(con, 7, 2019).then((result) => {
    console.log("result table: \n" , result);
    
})
.catch((err) => {
    console.log("errr : ", err);
});

module.exports = getMonthReport;