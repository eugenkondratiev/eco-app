const schedule = require('node-schedule');
const dbQuery = require('./controllers/model/db-local').dbQuery;
const logTask = require('./tasklog');

const ruleEveryDay = {
  hour: 9,
  minute: 9,
  second: 9
};

const ruleEveryHour = {minute: 1, second: 4};

module.exports = function () {
  const schDbPing = schedule.scheduleJob(ruleEveryHour, async function(){
    try {
     await dbQuery("SELECT 1");
    } catch (error) {
      // console.log(error);
           logTask("Db", ("  DbPing - error " + error.message + "\n"));
    } 

   });

  const schGetPlayers = schedule.scheduleJob(ruleEveryDay, async function () {
	try{
		await dbQuery("SELECT 1");
	} catch  (error) {
		logTask("Db", ("  DbPing - error " + error.message + "\n"));
	}
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