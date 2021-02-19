const schedule = require('node-schedule');
const dbQuery = require('./controllers/model/db-local').dbQuery;
const logTask = require('./tasklog');
const sendUpdateMessageEco1 = require('./controllers/send-update-message');


const ruleEveryDay = {
  hour: 9,
  minute: 9,
  second: 9
};


const ruleEveryWeek = {
  dayOfWeek: 0,
  hour: 11,
  minute: 11,
  second: 11
};

const ruleEveryHour = {
  minute: 1,
  second: 4
};
async function dbPing() {

  try {
    await dbQuery("SELECT 1");
    return true
  } catch (error) {
    // console.log(error);
    logTask("Db", ("  DbPing - error " + error.message + "\n"));
    return false
  }

}
module.exports = function () {
  const schDbPing = schedule.scheduleJob(ruleEveryHour, async function () {
    await dbPing()

  });

  const schMonthUpdate = schedule.scheduleJob(ruleEveryWeek, async function () {
    await dbPing();

    try {
      sendUpdateMessageEco1({
        lastMonthUpdate: true
      });
      logTask(1, ("  weekly update month message sended\n"));
    } catch (error) {
      logTask(1, ("  weekly month updating error : " + error.message + "\n"));
    }


  });

  const schDayUpdate = schedule.scheduleJob(ruleEveryDay, async function () {
    await dbPing();

    try {
      const ans2 = await require('./controllers/update-last-day')();
      logTask(2, ("  day checked. result : " + ans2 + "\n"));
    } catch (error) {
      logTask(2, ("  day checked. error : " + error.message + "\n"));

    }
    try {
      const ans1 = await require('./controllers/model/eco1-check-last-day')();
      logTask(1, ("  day checked. result : " + ans1 + "\n"));
      if ((parseInt(ans1) < 24) || !ans1) {
        require('./controllers/send-update-message')();
        logTask(1, ("  update message sended\n"));
      }
    } catch (error) {
      logTask(1, ("  day checked. error : " + error.message + "\n"));

    }
  });
}