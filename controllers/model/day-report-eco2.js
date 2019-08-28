const Eco1DayReport = require('./day-report-eco1');
// const mysqlConnection = require('./connection');

class Eco2DayReport extends Eco1DayReport {
    constructor() {
        super();
        this.eco = 2;

        //this.con = _con; // db connection
         this.HEADER = ["Дата", "Тепло, Гкал", "Расход воды, м3", "Вода на город, С", "Темп. оборотной, С",  "Вода в котле, С", "Давл.в котле, МПа", "Темп. дымовых до ЭКО, С", "Разрежение в топке, Па", "Давление воздуха, см.вд.ст." ];
    }
   
    //-----------------------------------------------------------------
    //====ovverride=======================================================
    getDayReportSql(day, month , year) {
        const startDay = this.formDayStr(day, month , year);
        return  `SELECT dt, w_38, q_39, T_41, T_42, T_3, P_19, T_10, P_21, P_34  FROM eco.hourseco2 where dt between '${startDay}' and DATE_ADD('${startDay}', INTERVAL 23 hour)`; 
    }


}


module.exports = Eco2DayReport;