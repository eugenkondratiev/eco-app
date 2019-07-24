$(function() {
    ;
    $("#testbutton").click(function(){
        $.get("http://95.158.47.15:3001/reports/day/test", function(data, status) {
            // alert("data: ", data, "\nStatus", status);
            try {
                $("#dayreport").html(data);
            } catch (error) {
                console.log(error.message);
            }
            
        })
        
    })
});

