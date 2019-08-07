$(function() {
    ;
    $("#testbutton").click(function(){
        $.get("http://95.158.47.15:3001/reports/month/test", function(data, status) {
            // alert("data: ", data, "\nStatus", status);
            try {
                $("#monthreport").html(data);
            } catch (error) {
                console.log(error.message);
            }
            
        })
        
    });

    $("#testbutton2").click(function(){

        $.get("http://95.158.47.15:3001/reports/month/1/", function(data, status) {
            // alert("data: ", data, "\nStatus", status);


            try {
                console.log("response" , data);
                
                // const message = JSON.parse(data);
                $("#monthreport").html(data);
                // $("#monthreport").html(message.data);

            } catch (error) {
                console.log(error.message);
            }
            
        })
    });
});

