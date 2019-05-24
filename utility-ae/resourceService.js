const relatedCSEUrl         = "http://localhost:3005";
const uuidv1                = require('uuid/v1');
const axios                 = require('axios')
const db                    = require('./db');

function createUtility() {
    let aeID = db.get("AE-Utility");

    if(aeID){
        return new Promise((resolve, reject) => { resolve(aeID) });
    }else{
        
        var data = {
            "m2m:ae": {
                "rn": "AE-Utility" + uuidv1(),
                "api": "0.2.481.2.0001.001." + "AE-" + uuidv1(),
                "rr": true,
                "poa": ["http://localhost:3001"],
                "srv": ["3"]
            }
        };
    
        return new Promise((resolve, reject) => {
            axios.post(relatedCSEUrl + '/api/v1/onem2m/~/in-cse', data, {
                headers: {
                    'User-Agent': 'ipe',
                    'X-M2M-RI': "RI0",
                    'X-M2M-Origin': "CUtility" + uuidv1(),
                    'Content-Type': 'application/json;ty=2',
                    'X-M2M-RVI':'v3'
                }
            })
            .then((res) => {
                let aeResourceId = res.data.con["m2m:ae"].ri;
                db.set("AE-Utility", aeResourceId);
                resolve(aeResourceId);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = {
    createUtility           : createUtility,
}
