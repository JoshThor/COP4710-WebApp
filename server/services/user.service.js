var mysql  = require("mysql");
var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'cop4710', //Replace this to fit DB name
    port: 3310
});

var service = {};
 
service.authenticate = authenticate;
service.create = create;
service.getAll = getAll;
service._delete = _delete;

 
module.exports = service;



//Authenticate a user
function authenticate(username, password) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query("select * from users WHERE username = ? AND pword = ?", [username, password], function(err, rows) {
            connection.release();
            if(!err && rows.length > 0) {
                //Found correct user
                deferred.resolve({
                    _id: rows[0].id,
                    username: rows[0].username,
                    firstName: rows[0].firstName,
                    lastName: rows[0].lastName,
                    email: rows[0].email,       //add this in main code and database
                    phone: rows[0].phone,        //add this in main code and database
                    token: jwt.sign({ sub: rows[0].id }, config.secret)
                });
                               
            } else if (err) {
                deferred.reject(err.name + ': ' + err.message);
            } else {
                //Authentication failed
                deferred.resolve();
            }
        });
    });
    return deferred.promise;
}

//Create a user
function create(userParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
       

        connection.query("select * from users WHERE username = ?", [userParam.username], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if(rows.length > 0 )
            {
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }

        });

        function createUser() {
            //var user = _.omit(userParam, 'password');
            //user.hash = bcrypt.hashSync(userParam.password, 10);

            var user = {username: userParam.username, pword: userParam.password, email: userParam.email, phone: userParam.phone, firstName: userParam.firstName, lastName: userParam.lastName};

            connection.query("insert into users set ?", user, function(err, rows) {
                if(err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                deferred.resolve();
            });
        }
    });
    return deferred.promise;
}

//Get all users
function getAll(){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Getting all users...");

        connection.query("select * from users", function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve(rows);

        });
    });
    return deferred.promise;
}

//Delete a user
function _delete(userId){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Deleting user: " + userId);

        connection.query("DELETE FROM users WHERE id = ?", [userId], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();

        });
    });
    return deferred.promise;
}