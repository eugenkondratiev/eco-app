const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];



$(function() {
    function getEcoName (_eco) {
        return `Котельная ${parseInt(_eco)}. `;
    };

    function getMonthPicker(_id) {
        const mt1 = $('<select>', { 
            "class" :"monthPicker",
            id : _id,
            autocomplete: "off",
            required: true
            });
            monthNames.forEach((mt, index) => {
                mt1.append( $("<option>", {
                    value: 1 + index,
                    text:  mt
                    }));        
                });
        return mt1;
    }

    function getYearPicker(_id, _minYear = 2018, _maxYear = 2048 ) {
        const mt1 = $('<select>', { 
            "class" :"yearPicker",
            id : _id,
            autocomplete: "off",
            required: true
            });
            for(let y = _minYear; y <= _maxYear; y++) {
                mt1.append( $("<option>", {
                    value: y,
                    text: y
                }));
            }
        return mt1;
    } 

    function getdata(request) {
        $.get(request, function(data, status, xhr) {
            // alert("data: ", data, "\nStatus", status);

            // console.log("status = ", status);
            const message = JSON.parse(data);
            // console.log("data :" , message)
            // console.log("data.err  :",message.err);
           
            try {
//                if (xhr.status == 204 || xhr.status > 399) {
                const message = JSON.parse(data);
                $('h1').text(getEcoName(message.eco) + message.tytle);
                if (message.err) {
                    $("#errorLabel").text(message.err);
                    $("#monthreport").html("");     
                } else {
                    $("#monthreport").html(message.data);
                    $("#errorLabel").text('');
                }

            } catch (error) {
                console.log(error.message);
            }
            
        })       
    };

    const currentDate = new Date();
    const currentMonth = parseInt(currentDate.getMonth() + 1);
    const currentYear = parseInt( currentDate.getFullYear());
    
    $("#Eco1ReqForm > p").append(getMonthPicker("monthPicker"));
    $("#Eco1ReqForm > p").append(getYearPicker("yearPicker"));

    $(`#yearPicker option[value=${currentYear}]`).attr("selected", "selected");
    $(`#monthPicker option[value=${currentMonth}]`).attr("selected", "selected");

    $('#Eco2ReqForm > p').append(getMonthPicker("monthPicker2"));
    $('#Eco2ReqForm > p').append(getYearPicker("yearPicker2"));
    $(`#yearPicker2 option[value=${currentYear}]`).attr("selected", "selected");
    $(`#monthPicker2 option[value=${currentMonth}]`).attr("selected", "selected");

    // $("#testbutton").click(function(){
    //     $.get("http://95.158.47.15:3001/reports/month/test", function(data, status) {
    //         try {
    //             const message = JSON.parse(data);
    //             $('h1').text(getEcoName(message.eco) + message.tytle);
    //             if (message.err) {
    //                 $("#errorLabel").text(message.err);
    //                 $("#monthreport").html("");     
    //             } else {
    //                 $("#monthreport").html(message.data);
    //                 $("#errorLabel").text('');
    //             }

    //         } catch (error) {
    //             console.log(error.message);
    //         }   
    //     })  
    // });


    $("#Eco1ReqForm").on('submit', function(e) {
        getMonthReport.call($(this), e, 1);
 
    });

    $("#Eco2ReqForm").on('submit', function(e) {
        getMonthReport.call($(this), e, 2);
 
    });

    $("#curmonth").click(function(e){
        const dt = new Date();
        console.log("Cet current month"); 
        getMonthReport.call($(this),e, 1, dt.getMonth() + 1, dt.getFullYear())
    });
    
    $("#lastmonth").click(function(e){
        const dt = new Date();
        const mn = dt.getMonth();
        console.log("Cet current month"); 
        getMonthReport.call($(this),e, 1, mn > 0 ? mn : 12, mn > 0 ? dt.getFullYear() : dt.getFullYear() - 1);

    });

    $("#lastmonth2").click(function(e){
        const dt = new Date();
        const mn = dt.getMonth();
        console.log("Cet current month"); 
        getMonthReport.call($(this),e, 2, mn > 0 ? mn : 12, mn > 0 ? dt.getFullYear() : dt.getFullYear() - 1);
        
    });
    $("#curmonth2").click(function(e){
        const dt = new Date();
        console.log("Cet current month"); 
        getMonthReport.call($(this),e, 2, dt.getMonth() + 1, dt.getFullYear())
    });

    // $("#testbutton2").click(function(){
    //     console.log("testbutton 2");
    //     $.get("http://95.158.47.15:3001/reports/month/1/", function(data, status) {
    //         try {
    //             console.log("status - " , status);
    //             console.log("response" , data);
                
    //             const message = JSON.parse(data);
    //             $('h1').text(getEcoName(message.eco) + message.tytle);
    //             if (message.err) {
    //                 $("#errorLabel").text(message.err);
    //                 $("#monthreport").html("");     
    //             } else {
    //                 $("#monthreport").html(message.data);
    //                 $("#errorLabel").text('');
    //             }

    //         } catch (error) {
    //             console.log(error.message);
    //         }   
    //     })
    // });

    function getMonthReport(e, _eco = 1, _mn, _yy) {
        e.preventDefault();
        try {
            const mn = _mn || $(this).find("select[id^=month]").val();
            const yy = _yy || $(this).find("select[id^=year]").val();;
            if (parseInt(yy) < 2018) {
                alert("Введите год от 2018 и выше");
                return
            };
            if (parseInt(mn) < 1 || parseInt(mn) > 12 ){
                alert("Введите верный месяц");
                return
            };   
            getdata(`http://95.158.47.15:3001/reports/month/${_eco}/?year=${yy}&month=${mn}`); 
        } catch (error) {
            console.log(error);
        }

    };
});

