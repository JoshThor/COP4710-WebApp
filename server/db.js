var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'cop4710db.cx20wwuhjwud.us-east-1.rds.amazonaws.com',
    user:'joshthorson',
    password: 'joshthorson',
    database: 'cop4710', //Replace this to fit DB name
    port: 3306
});

exports.pool = pool;
