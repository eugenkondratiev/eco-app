$(function () {

    function getdata(request) {
        $.get(request, function (data, status, xhr) {
            const message = JSON.parse(data);
            try {
                $('h1').text(getEcoName(message.eco) + message.tytle);
                if (message.err) {
                    console.log(xhr.status, message.err, typeof message.err);
                    $("#errorLabel").text(message.err);
                    $("#dayreport").html("");
                } else {
                    $("#errorLabel").text("");
                    $("#dayreport").html(message.data);
                };
            } catch (error) {
                console.log(error.message);
            }
        })
    };

    function getEcoName(_eco) {
        return `Котельная ${parseInt(_eco)}. `;
    };
    $("#Eco1ReqForm input[type=submit]").on('click', function (e) {
        e.preventDefault();
        const _eco = e.target.dataset.eco;
        getReport.call($("#Eco1ReqForm"), e, _eco);
    });


    $(".forms-container .buttons").click(function (e) {
        console.log(e.target.dataset.eco, e.target.dataset.today);
        const dt = e.target.dataset.today ? new Date() : new Date((new Date()) - 86400000);
        getReport.call($(this), e, parseInt(e.target.dataset.eco), dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $.datepicker.setDefaults($.datepicker.regional['ru']);

    function getDatePickerDate(dt) {
        const dateTime = new Date(dt);
        return `${dateTime.getDate()}.${1 + dateTime.getMonth()}.${dateTime.getFullYear()}`
    };

    const currentDate = getDatePickerDate(new Date());

    $("#datepicker1").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "dd.mm.yy"

    });
    $("#datepicker1").val(currentDate);

    $("#datepicker2").val(currentDate);

    $("#datepicker1").on('change', function (e) {
        const dt = $(this).val().split(/\.|\//);
        $("#Eco1ReqForm").find("input[name=day").val(dt[0]);
        $("#Eco1ReqForm").find("input[name=month").val(dt[1]);
        $("#Eco1ReqForm").find("input[name=year").val(dt[2]);
    });


    function getReport(e, _eco = 1, _dd, _mn, _yy) {
        e.preventDefault();
        let dt;
        try {
            dt = $(this).find("input[id^=datepicker]").val().split(/\.|\//);
        } catch (error) {
            ;
        }
        const dd = _dd || dt[0];
        const mn = _mn || dt[1];
        const yy = _yy || dt[2];
        if (parseInt(yy) < 2018) {
            alert("Введите год от 2018 и выше");
            return
        };
        if (parseInt(mn) < 1 || parseInt(mn) > 12 || parseInt(dd) < 1 || parseInt(dd) > 31) {
            alert("Введите верное число");
            return
        };
        getdata(`http://95.158.47.15:3001/reports/day/${_eco}/?year=${yy}&month=${mn}&day=${dd}`);

    };
});