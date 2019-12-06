const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'jeff',
    password: 'your_password',
    database: 'wallet_controll'
});

module.exports = db;