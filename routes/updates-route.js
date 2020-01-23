const updateLastDay2 = require('../controllers/update-last-day');
const sendUpdateMessageEco1 = require('../controllers/send-update-message');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const views = require('./abs-routes').views;

const logTask = require('../tasklog');

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

            logTask(1, (" have a request on last day Eco1 update\n"));

            // console.log(wsClients);
            try {
                const ans1 = await require('../controllers/model/eco1-check-last-day')();
                logTask(1, ("  day checked. result : " + ans1 + "\n"));
                if (parseInt(ans1) < 24) {
                    sendUpdateMessageEco1();
                    logTask(1, ("  update message sended\n"));
                }
            } catch (error) {
                logTask(1, ("  day checked. error : " + error.message + "\n"));

            }

            // sendUpdateMessageEco1();

        } else if (eco === 2) {
            // const logRecord = new Date() + " " + ' have a request on last day Eco2 update\n';
            // fs.appendFile('logs/update_day_eco2.txt', logRecord, err => {
            //     if (err) console.error;


            // });
            logTask(2, (" have a request on last day Eco2 update\n"));

            updateLastDay2();

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