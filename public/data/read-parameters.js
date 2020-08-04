const fs = require('fs');
const PARAMS_PATH = './public/data/parameters.json';
const LIST_PATH = './public/data/socket-parameters-list.json';
const AIS_PATH = './public/data/ais.json';

let lists;

function getLists() {
    return new Promise((resolve, reject) => {
        if (lists) {
            resolve(lists);
        }
        updateLists()
            .then((lists) => {
                resolve(lists)
            })
            .catch(err => {
                reject(err)
            });
    });

}

function updateLists() {
    return new Promise((resolve, reject) => {

        fs.readFile(PARAMS_PATH, (err, dataAis) => {
            if (err) {
                console.log(" PARAMS_PATH error ", err);
                reject(err);
            }
            fs.readFile(LIST_PATH, (err, dataPars) => {
                if (err) {
                    console.log("LIST_PATH file read problem - ", err);
                    reject(err);
                }
                try {
                    let lists = {};
                    let ecos = JSON.parse(dataAis);
                    // console.log("### ecos  - ", ecos);

                    const eco1 = ecos.eco1;
                    const eco2 = ecos.eco2;
                    const eco3 = ecos.eco3;
                    const parameters = JSON.parse(dataPars);
                    // console.log("### parameters ", parameters);

                    const new1 = {};
                    const new2 = {};
                    const new3 = {};
                    try {
                        parameters.eco1.forEach(el => {
                            new1[el] = {};
                            new1[el].description = eco1[el].description;
                            new1[el].units = eco1[el].units;
                            new1[el].index = eco1[el].index === undefined ? -1 : eco1[el].index;
                        });
                    } catch (error1) {
                        console.log("parse1 parameters problem - ", error1.message);
                        throw error1
                    }
                    try {
                        parameters.eco2.forEach(el => {
                            new2[el] = {};
                            new2[el].description = eco2[el].description;
                            new2[el].units = eco2[el].units;
                            new2[el].index = eco2[el].num;
                        });
                    } catch (error2) {
                        console.log("parse2 parameters problem - ", error2.message);
                        throw error2
                    }
                    try {
                        parameters.eco3.forEach(el => {
                            new3[el] = {};
                            new3[el].description = eco3[el].description;
                            new3[el].units = eco3[el].units;
                            //new3[el].index = eco3[el].index === undefined ? -1 : eco3[el].index;
                            new3[el].index = eco3[el].num;
                            // console.log(" ### new3[el] ", new3[el], eco3[el]);
                        });
                    } catch (error3) {
                        console.log("parse3 parameters problem - ", error3.message);
                        throw error3
                    }

                    lists.parameters = parameters;
                    lists.eco1 = new1;
                    lists.eco2 = new2;
                    lists.eco3 = new3;
                    // console.log("### lists - ", lists);
                    fs.writeFile(AIS_PATH, JSON.stringify(lists), (err) => {
                        if (err) console.log(err.message);
                        console.log("ais updated");

                    });
                    resolve(lists);;
                } catch (error) {
                    console.log("parse parameters problem - ", error.message);
                    reject(error.message);
                }
            });
        });
    });

}
module.exports = {
    getLists: getLists,
    updateLists: updateLists
};