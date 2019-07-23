const ais = require('./read-parameters');

ais.getLists().then(list => new Promise((resolve, reject) => {
        console.log("ais1 : \n", list);
        console.log("===========================================================");
        resolve(list);
    })
)
.catch(err => {
    console.log(err);
    
})
.finally(() => {
    ;
});



// console.log("ais2 : \n", getAis());
