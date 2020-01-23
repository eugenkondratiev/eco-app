module.exports = function (eco, msg) {
  const now = new Date();
  const logRecord = now.toLocaleString('ru-RU', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) + ":" + now.getMilliseconds() + " Eco" + eco + " " + msg;
  console.log(logRecord);
  require('fs').appendFile('./logs/update_day_eco' + eco + '.txt', logRecord, err => {
    if (err) console.error
  });
}