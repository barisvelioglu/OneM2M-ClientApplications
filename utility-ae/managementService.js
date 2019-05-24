const relatedCSEUrl         = "http://localhost:3005";
const uuidv1                = require('uuid/v1');
const axios                 = require('axios')
const JSONdb                = require('simple-json-db');
const db                    = new JSONdb(__dirname + '/../database.json');

function rebootDevice(){
    //buradan bir execinstance almalıyız
    let nodeID = db.get('NODE');
    let mgmtCmdID = db.get('MGMT_CMD_REBOOT');

    var data = {
        "m2m:mgc" : {
            "exe"    : true,
            "ext"    : nodeID
        }
    };

    return new Promise((resolve, reject) => {
        axios.put(relatedCSEUrl + '/api/v1/onem2m/~' + mgmtCmdID, data, {
            headers: {
                'User-Agent': 'ipe',
                'X-M2M-RI': "RI0",
                'X-M2M-Origin': "CUtility" + uuidv1(),
                'Content-Type': 'application/json;',
                'X-M2M-RVI':'v3'
            }
        })
        .then((res) => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

function upgradeSoftware(){
    //buradan bir execinstance almalıyız
    let nodeID = db.get('NODE');
    let mgmtCmdID = db.get('MGMT_CMD_SOFTWARE');

    var data = {
        "m2m:mgc" : {
            "exe"           : true,
            "ext"           : nodeID
        }
    };

    return new Promise((resolve, reject) => {
        axios.put(relatedCSEUrl + '/api/v1/onem2m/~' + mgmtCmdID, data, {
            headers: {
                'User-Agent': 'ipe',
                'X-M2M-RI': "RI0",
                'X-M2M-Origin': "CUtility" + uuidv1(),
                'Content-Type': 'application/json;',
                'X-M2M-RVI':'v3'
            }
        })
        .then((res) => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        });
    });  
}

module.exports = {
    rebootDevice                : rebootDevice,
    upgradeSoftware             : upgradeSoftware
}