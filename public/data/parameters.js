const fs = require('fs');

//var parameters ={ololo: 14};

class ParametersLists {


    static get lists(){ 
        if (this._lists) {
            console.log("gettsr shows ", this._lists);
            return this._lists;
        }    

        
        fs.readFile('./parameters.json', (err, dataAis) => {
            if (err) {
                console.log(err);
                return;
            }
            fs.readFile('./socket-parameters-list.json', (err, dataPars) => {
                if (err) {
                    console.log(err);
                    return;
                }  
                try {
                     let ecos = JSON.parse(dataAis);
                     const eco1 = ecos.eco1;
                     const eco2 = ecos.eco2;
                    //  const t1 = eco1["T_1"];
                    // console.log("===============parameters 0 =======================: \n", parameters);
                    const parameters = JSON.parse(dataPars);
                    // const pars1 = parameters.eco1;
                    const new1 = {};
                    const new2 = {};
                    // const el = pars1[0];
        
                    parameters.eco1.forEach( el => {
                        new1[el] = {};
                        new1[el].description = eco1[el].description;
                        new1[el].units = eco1[el].units;
                        new1[el].index = eco1[el].index === undefined ? -1 : eco1[el].index;
                    });
                    
                    parameters.eco2.forEach( el => {
                        new2[el] = {};
                        new2[el].description = eco2[el].description;
                        new2[el].units = eco2[el].units;
                        // new2[el].index = eco2[el].index === undefined ? -1 : eco2[el].index;
                    });
                    this._lists = {};
                    this._lists.parameters = parameters;
                    this._lists.eco1 = new1;
                    this._lists.eco2 = new2;

                     //console.log("eco1 : \n", eco1);
                    //  console.log("===============new parameters 1 =======================: \n", new1);
                    //  console.log("===============new parameters 2 =======================: \n", new2);
                    // console.log("===============parameters 1 =======================: \n", parameters);
                    //  console.log("T_1 ------------------: \n", t1);
                     ;   
                } catch (error) {
                    console.log(error.message);
                    
                }      
                // console.log("dataAis : \n",dataAis);
            });
        });
        
        
    };

    // static constructor() {
    //     // this._lists ={};
    //     this.AIS_PATH = './lists.json';
    //     this.updateLists();
    // }
 

    constructor() {
        ;
    }

}


const lists = new ParametersLists();
//ParametersLists.updateLists();

setTimeout(function() {
    console.log("lists.lists", lists.lists);
    // console.log("lists._lists", lists._lists);
    console.log("lists",ParametersLists.lists);

}, 3000);



