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

    $("#Eco1ReqForm > p").append(getMonthPicker("monthPicker"));
    $('#Eco2ReqForm > p').append(getMonthPicker("monthPicker2"));

    $("#testbutton").click(function(){
        $.get("http://95.158.47.15:3001/reports/month/test", function(data, status) {
            try {
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
    });

    $("#testbutton2").click(function(){
        console.log("testbutton 2");
        $.get("http://95.158.47.15:3001/reports/month/1/", function(data, status) {
            try {
                console.log("status - " , status);
                console.log("response" , data);
                
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
    });
});

