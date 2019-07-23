$(function() {

    function getAiRow(name, ai, prefix = "Eco1"){
        // const tr = document.createElement('tr');
        // $('<td>' , { text: name }).appendTo(tr);
        // $('<td>' , { text: ai.description }).appendTo(tr);
        // $('<td>' , { text: ai.units }).appendTo(tr);
        // $('<td>' , { id : name,  text: 'NaN' }).appendTo(tr);
        // return tr;
        return $('<tr>', {
            append : $('<td>' , { text: name })
            .add($('<td>' , { text: ai.description , "class": "aiLabel" }))
            .add($('<td>' , { text: ai.units }))
            .add($('<td>' , { id : `${prefix}_${name}`,  text: 'NaN', "class" : "value"  }))
        })           
    };
    
    console.log("start");
    $.getJSON('data/ais.json',data => {
        for (ai in data.eco2) {
            $('#dataEco2').append(getAiRow(ai, data.eco2[ai], "Eco2"));
        }
        
        // for (ai in data.eco1) {
        //     $('#dataEco1').append(getAiRow(ai, data.eco1[ai], "Eco1"));
        // }
        // $('#data').text(data.parameters.eco1[0]);
        // $('#data').val((data.eco1);
    });
});
