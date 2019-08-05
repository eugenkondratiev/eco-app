class ReportBaseUtils {
    constructor() {
        ;
    }

    //==============================================================================
    monthString(month){
        const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
        ];
    return monthNames[month - 1];
    }
    //==============================================================================
    monthName(month){
        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
    return monthNames[month - 1];
    }//==============================================================================
    getMonthTitle(reportMonth, reportYear) {
        return `Oтчет за ${this.monthName(reportMonth ||  this.reportMonth || 7)} ${reportYear || this.reportYear || 2019}`;
    }
    getDayTitle(reportDay, reportMonth, reportYear) {
        return `Oтчет за ${reportDay || this.reportDay || 14} ${this.monthString(reportMonth ||  this.reportMonth || 7 )} ${reportYear || this.reportYear || 2019}`;
    }    
    //==========================================================================

    getDateTimeFromMySql (dt) {
        //return dt.toISOString().slice(0, 19).replace('T', ' ');
        return (new Date ((new Date((new Date(new Date(dt))).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    }
    //==============================================================================
    getNiceMonth(month) {
        return month > 9 ? "" + month : "0" + month;
    }
    //==============================================================================
    getNiceday(day) {
        return day > 9 ? "" + day : "0" + day;
    }
    //========================================================================================
    formDayStr(day = 20, month = 1, fullyear = 2019) {
        return `${fullyear}-${this.getNiceMonth(month)}-${this.getNiceday(day)} 08:00:00`;
    }
    //========================================================================================
    arrFromObjectArrray(objArr, prop ="dtm") {
        let arr = objArr.map( e => this.getDateTimeFromMySql (e[prop]));
        return arr;
    }
    //==============================================================================
    formHourRow(row) {
        const hourRow = [];
        try {
            for (const prop in row) {
                if (row.hasOwnProperty(prop)) {
                if (prop !== "id") {
                    prop == "dt" ? hourRow.push( this.getDateTimeFromMySql(row[prop]) ) : hourRow.push(row[prop].toFixed(3));
                    };            
                }
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            return hourRow; 
        }
         
    };
    //==============================================================================

    dressUpDayRow(result) {
        let queryDays =[];
        try {
            const queryFields = Object.values(result[0]);

                            queryFields.map((el, index) => {
                                queryDays.push(el.toString().match(/[TZ]/) ? dtUtils.getDateTimeFromMySql(el).slice(0, 10) : parseFloat(el).toFixed(3));
                            });    
        } catch (error) {
            console.log(error.message); 
        } finally {
            return queryDays;
        }

    }
    //==============================================================================
    //==============================================================================
    arrToTableRow(arr) {
        let row = [];
        try {
            row = arr.map( record => {
                return "<tr>" + record.map(el => "<td>" + el + "</td>").join('')  + "</tr>";
            });            
        } catch (error) {
            console.log(error.message); 
            //row = ["error", "data"];           
        } finally {
            return row.join('');
        }
    }
    //==============================================================================.
    //================================================
    calcMonthData(allData) {
        const days = allData.length;
        //console.log(days);
        const sumRow = ["", 0,0,0,0,0,0,0,0];
        allData.map(function (dayRow){
            dayRow.forEach((e, i) => {
                if (i >= 1 && i < 3 ) {
                    sumRow[i] += parseFloat(e);
                } else if (i === 0){
                } else {
                    sumRow[i] += (parseFloat(e) / days);
                }; 
            })
        });
        return sumRow.map((e, i) => i > 0 ? e.toFixed(3) : "Всего/\nсреднее" );
    }

//==============================================================================
}

module.exports = ReportBaseUtils;