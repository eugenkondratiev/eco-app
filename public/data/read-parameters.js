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
                console.log(err);
                reject(err);
            }
            fs.readFile(LIST_PATH, (err, dataPars) => {
                if (err) {
                    console.log("file read problem - ", err);
                    reject(err);
                }
                try {
                    let ecos = JSON.parse(dataAis);
                    const eco1 = ecos.eco1;
                    const eco2 = ecos.eco2;
                    const parameters = JSON.parse(dataPars);
                    const new1 = {};
                    const new2 = {};

                    parameters.eco1.forEach(el => {
                        new1[el] = {};
                        new1[el].description = eco1[el].description;
                        new1[el].units = eco1[el].units;
                        new1[el].index = eco1[el].index === undefined ? -1 : eco1[el].index;
                    });

                    parameters.eco2.forEach(el => {
                        new2[el] = {};
                        new2[el].description = eco2[el].description;
                        new2[el].units = eco2[el].units;
                        new2[el].index = eco2[el].num;
                    });
                    lists = {};
                    lists.parameters = parameters;
                    lists.eco1 = new1;
                    lists.eco2 = new2;
                    fs.writeFile(AIS_PATH, JSON.stringify(lists), (err) => {
                        if (err) console.log(err.message);
                        console.log("ais updated");

                    });
                    resolve(lists);
                    ;
                } catch (error) {
                    console.log("parse parameters problem - ",error.message);
                    reject(err.message);
                }
            });
        });
    });

}
module.exports = {
    getLists: getLists,
    updateLists: updateLists
};