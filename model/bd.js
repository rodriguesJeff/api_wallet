const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bca2021220e5c4',
    password: 'a9181ef1',
    database: 'heroku_266315ec415862c'
});

module.exports = db;