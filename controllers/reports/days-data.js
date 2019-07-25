
module.exports = forEachDay;
//==============================================================================
const stringTemplates = require('./string-templates');
const getHtml = require('./html-templates');
const dataHandle = require('./data-handlers');

const getDayRow = require('./day-row');
const dtUtils = require('./date-utils');
const fs = require("fs");

const HTML_PATH = "bigdata/html/";

//==============================================================================

function forEachDay(_DaysArray, _con, options){
    let sequence = Promise.resolve();
    const allData =[];
    let htmlArr = [];
// -----------------------------------------------------------------------
    try {
        _DaysArray.forEach(function(day, i, arr){
            sequence = sequence.then(function(){
                return getDayRow(day, _con, options);
            })
            .then(function(dayRow){
                  allData.push(stringTemplates.dressUpDayRow(dayRow));
                if (i === arr.length - 1) {
                  //console.log(allData);
                    _con.end();
                    allData.push(dataHandle.calcMonthData(allData));
                    const htmlTable = stringTemplates.getTableHeader() + stringTemplates.arrToTableRow(allData);

                    // const htmlFile = htmlStart + htmlArr + htmlEnd;
                    const htmlFile = getHtml(htmlTable, 0 , options.reportMonth, options.reportYear, options.ECO1, options.MONTH_REPORT) ;
                    //console.log(htmlFile);
                    const reportFile = HTML_PATH +  options.reportYear  + "-"  + dtUtils.getNiceMonth(options.reportMonth) + ".html";
                    //console.log(reportFile);
                    
                    fs.writeFile(reportFile, htmlFile, function(){
                        console.log( "Сохранено в  " + reportFile);
                    });
                    // console.log("htmlFile : ",  htmlTable);
                }
            });
        });           
    } catch(e) {
        console.log(e.message); 
    } finally {
        ;
    }
} 
