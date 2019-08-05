//================================================
function calcMonthData(allData) {
    const days = allData.length;
    //console.log(days);
    const sumRow = ["", 0,0,0,0,0,0,0,0];
    allData.map(function (dayRow){
        dayRow.forEach((e, i) => {
            if (i >= 1 && i < 3 ) {
                sumRow[i] += parseFloat(e);
            } else if (i === 0){
            } else {
                sumRow[i] += (parseFloat(e) / days);
            }; 
        })
    });
    return sumRow.map((e, i) => i > 0 ? e.toFixed(3) : "Всего/\nсреднее" );
}

//==============================================================================

module.exports = {
    calcMonthData : calcMonthData
}