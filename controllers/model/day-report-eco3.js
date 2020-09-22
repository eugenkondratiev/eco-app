const Eco1DayReport = require('./day-report-eco1');

class Eco3DayReport extends Eco1DayReport {
    constructor(reportDay, reportMonth, reportYear) {
        super(reportDay, reportMonth, reportYear);
        this.eco = 3;

        this.HEADER = ["Дата", "Расход воды, м3",
            "Вода в котле, С", "Вода в котле,мин С", "Вода в котле,макс С",
            "Вода на сушки, С", "Вода на сушки,мин С", "Вода на сушки,макс С",
            "Давл.в котле, МПа", "Темп. дымовых, С", "Давление воздуха, Па.", "Разрежение в топке, Па"
        ];
        this.HEADER_LEGEND = ["dt", "q_39", "T_3", "T_3min", "T_3max", "T_18", "T_18min", "T_18max", "P_6", "T_7", "P_8", "P_9"];
    }

}


module.exports = Eco3DayReport;