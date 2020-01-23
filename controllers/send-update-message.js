;
module.exports = function(_msg) {
    for (ws in wsClients) {
        console.log(ws);

        try {
            const msgToEco1 = JSON.stringify({
                lastDayUpdate: true
            });
            console.log(msgToEco1);

            wsClients[ws].send(msgToEco1);
        } catch (error) {
            console.log(error.messsage);
            const logRecord = new Date() + " Message Error " + error.messsage + ' \n';

            fs.appendFile('logs/update_day_eco1.txt', logRecord, err => {
                if (err) console.error
            });

        };
    }
}