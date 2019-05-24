const JSONdb                = require('simple-json-db');
const db                    = new JSONdb(__dirname + '/../database.json');

module.exports = db;