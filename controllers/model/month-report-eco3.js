const Eco1MonthReport = require('./Month-report-eco1');
// const mysqlConnection = require('./connection');

class Eco3MonthReport extends Eco1MonthReport {
    constructor(reportMonth, reportYear) {
        super(reportMonth, reportYear);
        this.eco = 3;

        //this.con = _con; // db connection
        this.HEADER = ["Дата", "Расход воды, м3",
            "Вода в котле, С", "Вода в котле,мин С", "Вода в котле,макс С",
            "Вода на сушки, С", "Вода на сушки,мин С", "Вода на сушки,макс С",
             "Давл.в котле, МПа", "Темп. дымовых, С", "Давление воздуха, Па.", "Разрежение в топке, Па"];
    }
    //-----------------------------------------------------------------
    //====ovverride=======================================================
    //========================================================================================
    getDayReportSql(day) {
        return `SELECT dt, sum(q_39),  avg(T_3),  min(T_3), max(T_3), avg(T_18),  min(T_18), max(T_18),
         avg(P_6), avg(T_7), avg(P_8), avg(P_9)
        FROM eco.hourseco3 where dt between '${day}' and DATE_ADD('${day}', INTERVAL 23 hour);`;
        //dt, w_38, q_39, T_41, T_42, T_3, P_19, T_10, P_21, P_34  FROM eco.hourseco2
    }
    //========================================================================================
    monthDatesSql(month, year) {
        const mm = this.getNiceMonth(month);
        return `select distinct DATE_ADD(DATE(dt), INTERVAL 8 hour) as dtm  from eco.hourseco3 where month(dt) ='${mm}' and year(dt) = '${year}' `;//order by dt asc` ; 
    }


}


module.exports = Eco3MonthReport;