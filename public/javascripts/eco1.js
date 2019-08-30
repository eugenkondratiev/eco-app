$(function() {

    function getAiRow(name, ai, prefix = "Eco1"){
        return $('<tr>', {
            append : $('<td>' , { text: name })
            .add($('<td>' , { text: ai.description , "class": "aiLabel" }))
            .add($('<td>' , { text: ai.units }))
            .add($('<td>' , { id : `${prefix}_${name}`,  text: 'NaN', "class" : "value"  }))
        })           
    };

    console.log("start");
                   // var socket = io.connect('http://95.158.47.15:3001');
                   var socket = io.connect();
                   var username = "testuser" + (Math.random * 10000.0).toFixed(3);
                  socket.emit('little_newbie', username);
                   socket.on('message', function(message) {
                       console.log('The server has a message for you: ' + message);

                   });

    const ECO1_MESSAGE_BORDER = 50;

    $.getJSON('data/ais.json',data => {
   
        for (ai in data.eco1) {
            $('#dataEco1').append(getAiRow(ai, data.eco1[ai], "Eco1"));
        }

        socket.on('newdata', function(message) {
            // console.log(message);

            const dataM340 = JSON.parse(message.data);

            //console.log(data.parameters);

            try {
                data.parameters.eco1.forEach(el => {
                    const elName ="#Eco1_" + el;
                    $(elName).text(dataM340[ECO1_MESSAGE_BORDER + data.eco1[el].index]);
                });     
                $("#lastDataTimestamp").text("Обновлено : " + JSON.parse(message.timestamps)[0]);          
            } catch (error) {
                console.log(error.message);
            }
        });
    });
});