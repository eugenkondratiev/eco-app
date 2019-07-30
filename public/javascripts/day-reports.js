$(function() {
    
    function getdata(request) {
        $.get(request, function(data, status, xhr) {
            // alert("data: ", data, "\nStatus", status);

            // console.log("status = ", status);
            const message = JSON.parse(data);
            // console.log("data :" , message)
            // console.log("data.err  :",message.err);
           
            try {
//                if (xhr.status == 204 || xhr.status > 399) {
                   $('h1').text(getEcoName(message.eco) + message.tytle);
                if (message.err) {
                    // console.log("xhr.status = ", xhr.status);            
                    console.log(xhr.status, message.err, typeof message.err);  
                    $("#errorLabel").text(message.err);

                    $("#dayreport").html("");
                } else {
                     $("#dayreport").html(message.data);        
                };
            } catch (error) {
                console.log(error.message);
            }
            
        })       
    };

    function getEcoName (_eco) {
        return `Котельная ${parseInt(_eco)}. `;
    };



    $("#Eco1ReqForm").on('submit', function(e) {
        getReport.call($(this), e, 1);
 
    });

    $("#Eco2ReqForm").on('submit', function(e) {
        getReport.call($(this), e, 2);
    });

    $("#todayRepEco1").click(function(e) {
        const dt = new Date();
        // console.log(dt);
        getReport.call($(this), e, 1, dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $("#yesterdayRepEco1").click( function(e) {
        const dt = new Date((new Date()) - 86400000 );
        // console.log(dt);
        getReport.call($(this), e, 1, dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $("#todayRepEco2").click(function(e) {
        const dt = new Date();
        // console.log(dt);
        getReport.call($(this), e, 2, dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $("#yesterdayRepEco2").click( function(e) {
        const dt = new Date((new Date()) - 86400000 );
        // console.log(dt);
        getReport.call($(this), e, 2, dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $.datepicker.setDefaults($.datepicker.regional['ru']);

    function getDatePickerDate(dt) {
        const dateTime = new Date(dt);
        return `${dateTime.getDate()}.${1 + dateTime.getMonth()}.${dateTime.getFullYear()}`
    };

    const currentDate = getDatePickerDate(new Date());

    $( "#datepicker1" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat : "dd.mm.yy"
        
    });
      $( "#datepicker1" ).val(currentDate);

      $( "#datepicker2" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat : "dd.mm.yy"
      });
      $( "#datepicker2" ).val(currentDate);

      $( "#datepicker1" ).on('change', function(e) {
        // const dt = $(this).val().split(".");
        const dt = $(this).val().split(/\.|\//);
        // console.log($(this).val(), "      ", dt);
        // console.log(dt[0], "-", dt[1], "-", dt[2]);
        $("#Eco1ReqForm").find("input[name=day").val(dt[0]);
        $("#Eco1ReqForm").find("input[name=month").val(dt[1]);
        $("#Eco1ReqForm").find("input[name=year").val(dt[2]);
        // alert($(this).val());
    });

    $( "#datepicker2" ).on('change', function(e) {
        const dt = $(this).val().split(/\.|\//);
        // console.log($(this).val(), "      ", dt);
        // console.log(dt[0], "-", dt[1], "-", dt[2]);
        $("#Eco2ReqForm").find("input[name=day").val(dt[0]);
        $("#Eco2ReqForm").find("input[name=month").val(dt[1]);
        $("#Eco2ReqForm").find("input[name=year").val(dt[2]);
        // alert($(this).val());
        // alert($(this).val());
    });

    function getReport(e, _eco = 1, _dd , _mn, _yy) {
        e.preventDefault();

        // const dd = _dd || $(this).find("input[name=day").val();
        // const mn = _mn || $(this).find("input[name=month").val();
        // const yy = _yy || $(this).find("input[name=year").val();
/**
 *         const dt = $(this).val().split(/\.|\//);
        console.log($(this).val(), "      ", dt);
        console.log(dt[0], "-", dt[1], "-", dt[2]);
        $("#Eco1ReqForm").find("input[name=day").val(dt[0]);
        $("#Eco1ReqForm").find("input[name=month").val(dt[1]);
        $("#Eco1ReqForm").find("input[name=year").val(dt[2]);
 */

        let dt;
        try {
            dt = $(this).find("input[id^=datepicker]").val().split(/\.|\//);
            // console.log(dt);            
        } catch (error) {
            ;
        }

        
        const dd = _dd || dt[0];
        const mn = _mn || dt[1];
        const yy = _yy || dt[2];

        // console.log(`${dd} / ${mn} / ${yy}`);
        
        if (parseInt(yy) < 2018) {
            alert("Введите год от 2018 и выше");
            return
        };
        if (parseInt(mn) < 1 || parseInt(mn) > 12 || parseInt(dd) < 1 || parseInt(dd) > 31 ){
            alert("Введите верное число");
            return
        };

        getdata(`http://95.158.47.15:3001/reports/day/${_eco}/?year=${yy}&month=${mn}&day=${dd}`); 

    };
});

