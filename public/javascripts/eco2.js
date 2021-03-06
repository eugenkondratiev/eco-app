$(function () {
const HOST = "http://95.158.44.52:3001";
    function getAiRow(name, ai, prefix = "Eco1") {
        return $('<tr>', {
            append: $('<td>', {
                    text: name
                })
                .add($('<td>', {
                    text: ai.description,
                    "class": "aiLabel"
                }))
                .add($('<td>', {
                    text: ai.units
                }))
                .add($('<td>', {
                    id: `${prefix}_${name}`,
                    text: 'NaN',
                    "class": "value"
                }))
        })
    };

    const socket = io.connect(HOST);
    const username = "testuser";
    socket.emit('little_newbie', username);
    socket.on('message', function (message) {
        console.log('The server has a message for you: ' + message);
    });

    console.log("start");
    $.getJSON('data/ais.json', data => {
        for (ai in data.eco2) {
            $('#dataEco2').append(getAiRow(ai, data.eco2[ai], "Eco2"));
        }
        socket.on('newdata', function (message) {
            const dataM340 = JSON.parse(message.data);
            try {
                data.parameters.eco2.forEach(el => {
                    const elName = "#Eco2_" + el;
                    $(elName).text(dataM340[data.eco2[el].index]);
                });
                $("#last-data-timestamp").text("Обновлено : " + JSON.parse(message.timestamps)[1]);
            } catch (error) {
                console.log(error.message);
            }
        });
    });
});