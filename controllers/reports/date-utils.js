module.exports = {
    monthString :monthString,
    getDateTimeFromMySql: getDateTimeFromMySql,
    getNiceMonth : getNiceMonth,
    getNiceday : getNiceday,
    dayReportSql : dayReportSql,
    formDayStr : formDayStr,
    getDayReportSql : getDayReportSql,
    monthName : monthName,
    arrFromObjectArrray : arrFromObjectArrray,
    monthDatesSql : monthDatesSql
}

//==============================================================================
function monthString(month){
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
return monthNames[month - 1];
}
//==============================================================================
function monthName(month){
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
return monthNames[month - 1];
}//==============================================================================
function getDateTimeFromMySql (dt) {
    //return dt.toISOString().slice(0, 19).replace('T', ' ');
    return (new Date ((new Date((new Date(new Date(dt))).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
}
//==============================================================================
function getNiceMonth(month) {
    return month > 9 ? "" + month : "0" + month;
}
//==============================================================================
function getNiceday(day) {
    return day > 9 ? "" + day : "0" + day;
}
//==============================================================================
function dayReportSql(day, month , year, eco = 1) {
    const startDay = formDayStr(day, month , year);
    return eco == 2 
    ? /**change for eco2 */  `SELECT dt, w_38, q_39, T_41, T_42, P_19, P_18, T_10, P_36  FROM eco2.hr3 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`
    :   `SELECT dt, w_38, q_39, T_41, T_42, P_19, P_18, T_10, P_36  FROM eco2.hr3 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
}
//========================================================================================
function getDayReportSql(day, eco = 1) {
    return  eco === 2 
    ? `SELECT dt, sum(w_38), sum(q_39),  avg(T_41), avg(T_42), avg(P_19), avg(P_18), avg(T_10), avg(P_36)
      FROM eco2.hr3 where dt between '${day}' and DATE_ADD('${day}', INTERVAL 23 hour);`
    : `SELECT dt, sum(w_38), sum(q_39),  avg(T_41), avg(T_42), avg(P_19), avg(P_18), avg(T_10), avg(P_36)
      FROM eco2.hr3 where dt between '${day}' and DATE_ADD('${day}', INTERVAL 23 hour);`
    ;
 }
 //========================================================================================

 function monthDatesSql(month , year) {
    const mm = getNiceMonth(month);
    return `select distinct DATE_ADD(DATE(dt), INTERVAL 8 hour) as dtm  from eco2.hr3 where month(dt) ='${mm}' and year(dt) = '${year}' `;//order by dt asc` ; 
}
//========================================================================================
 function formDayStr(day = 20, month = 1, fullyear = 2019) {
    return `${fullyear}-${getNiceMonth(month)}-${getNiceday(day)} 08:00:00`;
}
//========================================================================================
function arrFromObjectArrray(objArr, prop ="dtm") {
    let arr = objArr.map( e => getDateTimeFromMySql (e[prop]));
    return arr;
}

// //==============================================================================

//==============================================================================
//==============================================================================
