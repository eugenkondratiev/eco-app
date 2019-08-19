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
    
    var socket = io.connect('http://95.158.47.15:3001');
    var username = "testuser";
    socket.emit('little_newbie', username);
    socket.on('message', function(message) {
         console.log('The server has a message for you: ' + message);
      });

    console.log("start");
    $.getJSON('data/ais.json',data => {
        for (ai in data.eco2) {
            $('#dataEco2').append(getAiRow(ai, data.eco2[ai], "Eco2"));
        }
     
        socket.on('newdata', function(message) {
            const dataM340 = JSON.parse(message);
            // console.log(data.parameters);
            try {
                data.parameters.eco2.forEach(el => {
                    const elName ="#Eco2_" + el;
                    $(elName).text(dataM340[data.eco2[el].index]);
                });               
            } catch (error) {
                console.log(error.message);
            }
        });
    });
});