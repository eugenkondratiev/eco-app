const Eco1DayReport = require('./day-report-eco1');
// const mysqlConnection = require('./connection');

class Eco3DayReport extends Eco1DayReport {
    constructor(reportDay, reportMonth, reportYear) {
        super(reportDay, reportMonth, reportYear);
        this.eco = 3;

        //this.con = _con; // db connection
        this.HEADER = ["Дата", "Расход воды, м3",
            "Вода в котле, С", "Вода в котле,мин С", "Вода в котле,макс С",
            "Вода на сушки, С", "Вода на сушки,мин С", "Вода на сушки,макс С",
            "Давл.в котле, МПа", "Темп. дымовых, С", "Давление воздуха, Па.", "Разрежение в топке, Па"];
    }

    //-----------------------------------------------------------------
    //====ovverride=======================================================
    getDayReportSql(day, month, year) {
        const startDay = this.formDayStr(day, month, year);
        return `SELECT dt, q_39,  
        T_3,  T_3, T_3, T_18,  T_18min, T_18max,
        P_6, T_7, P_8, P_9  
        FROM eco.hourseco3 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`;
    }


}


module.exports = Eco3DayReport;