const schedule = require('node-schedule');

const logTask = require('./tasklog');

const ruleEveryHour = {
  hour: 9,
  minute: 9,
  second: 9
};
module.exports = function () {
  const schGetPlayers = schedule.scheduleJob(ruleEveryHour, async function () {
    try {
      const ans2 = await require('./controllers/update-last-day')();
      logTask(2, ("  day checked. result : " + ans2 + "\n"));
    } catch (error) {
      logTask(2, ("  day checked. error : " + error.message + "\n"));

    }
    try {
      const ans1 = await require('./controllers/model/eco1-check-last-day')();
      logTask(1, ("  day checked. result : " + ans1 + "\n"));
      if ((parseInt(ans1) < 24)  || !ans1) {
        require('./controllers/send-update-message')();
        logTask(1, ("  update message sended\n"));
      }
    } catch (error) {
      logTask(1, ("  day checked. error : " + error.message + "\n"));

    }
  });
}