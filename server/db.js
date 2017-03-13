var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'cop4710', //Replace this to fit DB name
    port: 3310
});

exports.pool = pool;