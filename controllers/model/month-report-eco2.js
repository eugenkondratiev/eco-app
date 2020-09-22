const Eco1MonthReport = require('./Month-report-eco1');

class Eco2MonthReport extends Eco1MonthReport {
    constructor(reportMonth, reportYear) {
        super(reportMonth, reportYear);
        this.eco = 2;

        //this.con = _con; // db connection
         this.HEADER = ["Дата", "Тепло, Гкал", "Расход воды, м3", "Вода на город, С", "Темп. оборотной, С",  "Вода в котле, С", "Давл.в котле, МПа", "Темп. дымовых до ЭКО, С", "Разрежение в топке, Па", "Давление воздуха, см.вд.ст." ];
    }
    //-----------------------------------------------------------------
    //====ovverride=======================================================
    //========================================================================================
    getDayReportSql(day) {
        return  `SELECT dt, sum(w_38), sum(q_39),  avg(T_41),  avg(T_42), avg(T_3), avg(P_19), avg(T_10), avg(P_21), avg(P_34)
        FROM eco.hourseco2 where dt between '${day}' and DATE_ADD('${day}', INTERVAL 23 hour);`;
        //dt, w_38, q_39, T_41, T_42, T_3, P_19, T_10, P_21, P_34  FROM eco.hourseco2
    }
    //========================================================================================
    monthDatesSql(month , year) {
        const mm = this.getNiceMonth(month);
        return `select distinct DATE_ADD(DATE(dt), INTERVAL 8 hour) as dtm  from eco.hourseco2 where month(dt) ='${mm}' and year(dt) = '${year}' `;//order by dt asc` ; 
    }


}


module.exports = Eco2MonthReport;