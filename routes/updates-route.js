const updateLastDay2 = require('../controllers/update-last-day');

const express = require('express');
const router = express.Router();
const fs = require('fs');
const views = require('./abs-routes').views;

router.use(function (req, res, next) {
    console.log("update last day request", req.path);
    next();
});

router.get("/:ecoId/", async (req, res, next) => {
    try {
        ;

        const eco = parseInt(req.params.ecoId);
        if (eco === 1) {
            ; //message
            const logRecord = new Date() + " " + ' have a request on last day Eco1 update\n';
            
            fs.appendFile('logs/update_day_eco1.txt', logRecord, err => {
                if (err) console.error
            });
            // console.log(wsClients);

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
        } else if (eco === 2) {
            const logRecord = new Date() + " " + ' have a request on last day Eco2 update\n';
            fs.appendFile('../logs/update_day_eco2.txt', logRecord, err => {
                if (err) console.error
            });

            await updateLastDay2();
        } else {
            ;
        }

        res.sendFile('/index.html', {
            root: views
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(" index.html is sended");
            }
        });

    } catch (error) {
        res.status(501);
        console.log(error.message);
    }
})



module.exports = router;