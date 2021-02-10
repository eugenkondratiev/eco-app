;
// const updateLastDay2 = require('../controllers/update-last-day');
const sendUpdateMessageEco1 = require('../controllers/send-update-message');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const views = require('./abs-routes').views;

const logTask = require('../tasklog');

router.use(function (req, res, next) {
    console.log("update month request", req.path);
    next();
});
/*
router.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

router.get("/:ecoId/", async (req, res, next) => {
    try {
        ;

        const eco = parseInt(req.params.ecoId);
        if (eco === 1) {
            ; //message

            logTask(1, (" have a request on last month Eco1 update\n"));

            // console.log(wsClients);
            try {

                    sendUpdateMessageEco1({ lastMonthUpdate: true });
                    logTask(1, ("  update month message sended\n"));
            } catch (error) {
                logTask(1, ("  month updating error : " + error.message + "\n"));
            }
            // sendUpdateMessageEco1({ lastMonthUpdate: true });
        } else if (eco === 2) {
            logTask(2, (" have a request on last month Eco2 update\n"));
            // const ans2  = await updateLastDay2();

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


router.post("/:ecoId/", async (req, res, next) => {
    let answer = 0;
    try {
        ;

        const eco = parseInt(req.params.ecoId);
        if (eco === 1) {
            ; //message

            logTask(1, (" have a request on last month Eco1 update\n"));

            // console.log(wsClients);
            try {
                // answer = await require('../controllers/model/eco1-check-last-day')();
                // logTask(1, ("  day checked. result : " + answer + "\n"));
                // if (parseInt(answer) < 24) {
                    sendUpdateMessageEco1({ lastMonthUpdate: true });
                    logTask(1, ("  update month message sended\n"));
                // }
            } catch (error) {
                logTask(1, ("  month updating error : " + error.message + "\n"));

            }
            // sendUpdateMessageEco1();

        } else if (eco === 2) {
            // const logRecord = new Date() + " " + ' have a request on last day Eco2 update\n';
            // fs.appendFile('logs/update_day_eco2.txt', logRecord, err => {
            //     if (err) console.error;


            // });
            logTask(2, (" have a request on last month Eco2 update\n"));

            // answer = await updateLastDay2();
            // TODO in future
        } else {
            ;
        }
    } catch (error) {
        res.status(501);
        console.log(error.message);
    }

    res.status(200).send(JSON.stringify(answer));

})

module.exports = router;