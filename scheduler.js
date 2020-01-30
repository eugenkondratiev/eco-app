const schedule = require('node-schedule');
//   const getPlayers = require('./model/get-players-base');

// function logTask(eco, msg) {
//   const logRecord = new Date() + "Eco" + eco + " " + msg;
//   require('fs').appendFile('./logs/update_day_eco' + eco + '.txt', logRecord, err => {
//     if (err) console.error
//   });
// }
const logTask = require('./tasklog');

const ruleEveryHour = {
  hour: 9,
  minute: 9,
  second: 9
};
// const ruleEveryHour = { hour: 9, minute: 9  , second: 9};

// const ruleEveryID = {hour: [3, 12] , minute: [17, 21]  , second: 20, dayOfWeek: [2, 3, 4, 6]};
//  const ruleEveryID2 = {hour: 14, minute: [55, 58], second: 14, dayOfWeek: [2, 4, 6]};

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

    // require('fs').appendFile('./logs/update_day_eco2.json', JSON.stringify(logRecord, ' '), err => { if (err) console.error });

  });
}