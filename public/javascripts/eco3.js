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
    
    const socket = io.connect('http://95.158.47.15:3001');
    const username = "testuser";
    socket.emit('little_newbie', username);
    socket.on('message', function(message) {
         console.log('The server has a message for you: ' + message);
      });

    console.log("start");
	const ECO3_MESSAGE_BORDER = 99;

    $.getJSON('data/ais.json',data => {
	// console.log( " #### Eco3  data " , data);

        for (ai in data.eco3) {
            $('#dataEco3').append(getAiRow(ai, data.eco3[ai], "Eco3"));
        }   
        socket.on('newdata', function(message) {
            const dataM340 = JSON.parse(message.data);
            // console.log(data.parameters);
 		// console.table(" #### Eco3   ",dataM340);
		
            try {
                data.parameters.eco3.forEach(el => {
                    const elName ="#Eco3_" + el;
			// console.log(" #eco3 ",el, data.eco3[el].index, data.eco3[el]);
                    $(elName).text(dataM340[ECO3_MESSAGE_BORDER + data.eco3[el].index]);
                });   
                $("#last-data-timestamp").text("Обновлено : " + JSON.parse(message.timestamps)[2]);             
            } catch (error) {
                console.log(error.message);
            }
        });
    });
});