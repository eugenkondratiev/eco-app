
  const schedule = require('node-schedule');
//   const getPlayers = require('./model/get-players-base');
   

const ruleEveryHour = { minute: [17, 55]  , second: 5};
// const ruleEveryID = {hour: [3, 12] , minute: [17, 21]  , second: 20, dayOfWeek: [2, 3, 4, 6]};
  //  const ruleEveryID2 = {hour: 14, minute: [55, 58], second: 14, dayOfWeek: [2, 4, 6]};

  module.exports = function() {
    const schGetPlayers = schedule.scheduleJob(ruleEveryHour, function(){
    //   console.log(new Date(), 'Get players started');
      ;
    //   getPlayers();
    //   const logRecord = new Date() +  'Get players done\n';
    //   require('fs').appendFile("actionlog.txt", logRecord, err=>{if (err) console.error(err)});
    });
  }