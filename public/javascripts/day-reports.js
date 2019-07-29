$(function() {
    
    function getdata(request) {
        $.get(request, function(data, status) {
            // alert("data: ", data, "\nStatus", status);
            try {
                if (data.err) {
                    $('errorLabel').text(data.err);
                };
                const message = JSON.parse(data);
                console.log("data :" , message)
                $("#dayreport").html(message.data);
                $('h1').text(getEcoName(message.eco) + message.tytle);
            } catch (error) {
                console.log(error.message);
            }
            
        })       
    };

    function getEcoName (_eco) {
        return `Котельная ${parseInt(_eco)}. `;
    };

    $("#testbutton").click(function(){
        getdata("http://95.158.47.15:3001/reports/day/test"); 
    });

    $("#testbutton2").click(function(){

        getdata("http://95.158.47.15:3001/reports/day/test2"); 
        // $.get("http://95.158.47.15:3001/reports/day/test2", function(data, status) {
        //     // alert("data: ", data, "\nStatus", status);
        //     try {
        //         const message = JSON.parse(data);
        //         console.log("data :" , message)
        //         $("#dayreport").html(message.data);
        //         $('h1').text(message.tytle);
        //      } catch (error) {
        //         console.log(error.message);
        //     }
            
        // })
        
    });

    $("#testbutton3").click(function(){
        getdata("http://95.158.47.15:3001/reports/day/1/"); 
    });

    $("#testbutton4").click(function(){
        getdata("http://95.158.47.15:3001/reports/day/1/?year=2019&month=6&day=5"); 
    });

    function getReport(e, _eco = 1, _dd , _mn, _yy) {
        e.preventDefault();

        const dd = _dd || $(this).find("input[name=day").val();
        const mn = _mn || $(this).find("input[name=month").val();
        const yy = _yy || $(this).find("input[name=year").val();
        console.log(`${dd} / ${mn} / ${yy}`);
        
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

    $("#Eco1ReqForm").on('submit', function(e) {
        getReport.call($(this), e, 1);
 
    });

    $("#Eco2ReqForm").on('submit', function(e) {
        getReport.call($(this), e, 2);
    });

    $("#todayRepEco1").click(function(e) {
        const dt = new Date();
        console.log(dt);
        getReport.call($(this), e, 1, dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $("#yesterdayRepEco1").click( function(e) {
        const dt = new Date((new Date()) - 86400000 );
        console.log(dt);
        getReport.call($(this), e, 1, dt.getDate(), dt.getMonth() + 1, dt.getFullYear());
    });

    $.datepicker.setDefaults($.datepicker.regional['ru']);



    $( "#datepicker1" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat : "dd.mm.yy"
        
      });

      $( "#datepicker2" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat : "dd/mm/yy"
      });

      $( "#datepicker1" ).on('change', function(e) {
        // const dt = $(this).val().split(".");
        const dt = $(this).val().split(/\.|\//);
        console.log($(this).val(), "      ", dt);
        console.log(dt[0], "-", dt[1], "-", dt[2]);
        $("#Eco1ReqForm").find("input[name=day").val(dt[0]);
        $("#Eco1ReqForm").find("input[name=month").val(dt[1]);
        $("#Eco1ReqForm").find("input[name=year").val(dt[2]);
        // alert($(this).val());
    });

    $( "#datepicker2" ).on('change', function(e) {
        const dt = $(this).val().split(/\.|\//);
        console.log($(this).val(), "      ", dt);
        console.log(dt[0], "-", dt[1], "-", dt[2]);
        $("#Eco2ReqForm").find("input[name=day").val(dt[0]);
        $("#Eco2ReqForm").find("input[name=month").val(dt[1]);
        $("#Eco2ReqForm").find("input[name=year").val(dt[2]);
        // alert($(this).val());
        // alert($(this).val());
    });

});

