const schedule = require('node-schedule');
//   const getPlayers = require('./model/get-players-base');


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
    const ans1 = await require('./controllers/update-last-day')();
    const logRecord = new Date() + " " + ' day checked\n';
    require('fs').appendFile('./logs/update_day_eco2.txt', logRecord, err => {
      if (err) console.error
    });
    // require('fs').appendFile('./logs/update_day_eco2.json', JSON.stringify(logRecord, ' '), err => { if (err) console.error });

  });
}