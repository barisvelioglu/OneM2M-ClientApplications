const express               = require('express')
const app                   = express()
const resourceService       = require('./resourceService');
const managementService     = require('./managementService');
const db                    = require('./db');

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Welcome to device!')
});

app.get('/updatesoftware', function (req, res) {
    managementService.upgradeSoftware().then(() => { res.send('Upgrade process is started!') }, (error) => { res.send(error)});
});

app.get('/factoryreset', function (req, res) {
    managementService.factoryReset().then(() => { res.send('Factory reset process is started!') }, (error) => { res.send(error)});
});

app.get('/rebootdevice', function (req, res) {
    managementService.rebootDevice().then(() => { res.send('Rebooting process is started!') }, (error) => { res.send(error)});
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});

resourceService.createUtility().then(

                                    (aeID) =>   { 
                                                    console.log(aeID); 
                                                }, 
                                    (error) =>  { 
                                                    console.log(error); 
                                                })