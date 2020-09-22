$(function() {

    function getAiRow(name, ai, prefix = "Eco1"){
        return $('<tr>', {
            append : $('<td>' , { text: name })
            .add($('<td>' , { text: ai.description , "class": "aiLabel" }))
            .add($('<td>' , { text: ai.units }))
            .add($('<td>' , { id : `${prefix}_${name}`,  text: 'NaN', "class" : "value"  }))
        })           
    };
    
    const socket = io.connect('http://95.158.47.15:3001');
    const username = "testuser";
    socket.emit('little_newbie', username);
    socket.on('message', function(message) {
         console.log('The server has a message for you: ' + message);
      });

    console.log("start");
	const ECO3_MESSAGE_BORDER = 99;

    $.getJSON('data/ais.json',data => {

        for (ai in data.eco3) {
            $('#dataEco3').append(getAiRow(ai, data.eco3[ai], "Eco3"));
        }   
        socket.on('newdata', function(message) {
            const dataM340 = JSON.parse(message.data);
            try {
                data.parameters.eco3.forEach(el => {
                    const elName ="#Eco3_" + el;
                    $(elName).text(dataM340[ECO3_MESSAGE_BORDER + data.eco3[el].index]);
                });   
                $("#last-data-timestamp").text("Обновлено : " + JSON.parse(message.timestamps)[2]);             
            } catch (error) {
                console.log(error.message);
            }
        });
    });
});