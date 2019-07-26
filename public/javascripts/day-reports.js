$(function() {
    ;
    function getdata(request) {
        $.get(request, function(data, status) {
            // alert("data: ", data, "\nStatus", status);
            try {
                const message = JSON.parse(data);
                console.log("data :" , message)
                $("#dayreport").html(message.data);
                $('h1').text(message.tytle);
            } catch (error) {
                console.log(error.message);
            }
            
        })       
    }

    $("#testbutton").click(function(){
        getdata("http://95.158.47.15:3001/reports/day/test"); 
    });

    $("#testbutton2").click(function(){

        getdata("http://95.158.47.15:3001/reports/day/2/"); 
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

});

