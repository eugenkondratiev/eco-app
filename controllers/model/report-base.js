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
    getMonthTitle(reportMonth = 6, reportYear = 2019) {
        return `Oтчет за ${this.monthName(reportMonth)} ${reportYear}`;
    }
    getDayTitle(reportDay = 20, reportMonth = 6, reportYear = 2019) {
        return `Oтчет за ${reportDay} ${this.monthString(reportMonth)} ${reportYear}`;;
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
    //==============================================================================
}

module.exports = ReportBaseUtils;