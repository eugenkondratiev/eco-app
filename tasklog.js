module.exports = function(eco, msg) {
    const logRecord = new Date() + "Eco" + eco + " " + msg;
    require('fs').appendFile('./logs/update_day_eco' + eco + '.txt', logRecord, err => {
      if (err) console.error
    });
  }