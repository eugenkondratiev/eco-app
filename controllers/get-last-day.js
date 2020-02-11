
function getLastDayString() {
    const lastDay = (new Date(new Date() - 24 * 3600000));
    return lastDay.toLocaleString("ru-UA",{year:"numeric",month:"2-digit", day: "2-digit"}).slice(0, 10);
}
function getCurrentDayString() {
    return (new Date()).toLocaleString().slice(0, 10);
}

function getHourString(_lastDay) {
    // console.log(_lastDay);
    return _hour => {
        return `${_lastDay} ${_hour > 9 ? _hour : "0" + _hour}:00:00`
    }
}

//const getLastDayHourString = getHourString(getLastDayString());
//const getCurrentDayHourString = getHourString(getCurrentDayString());


function getLastDayHourString(_hour) {
	return `${getLastDayString()} ${_hour > 9 ? _hour : "0" + _hour}:00:00`
}

function getCurrentDayHourString(hour) {
	return `${getCurrentDayString()} ${_hour > 9 ? _hour : "0" + _hour}:00:00`
}

module.exports = {
    getLastDayHourString: getLastDayHourString,
    getLastDayString: getLastDayString,
    getCurrentDayHourString: getCurrentDayHourString
}





