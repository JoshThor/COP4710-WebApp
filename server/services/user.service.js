var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var pool = require('../db').pool;

var service = {};
 
service.authenticate = authenticate;
service.create = create;
service.getAll = getAll;
service._delete = _delete;
service.getUserById = getUserById;

 
module.exports = service;

//Authenticate a user
function authenticate(username, password) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query("select * from users WHERE username = ?", [username], function(err, rows) {
            //connection.release();

            var role;

            if(!err && rows.length > 0 && bcrypt.compareSync(password, rows[0].hashPass)) {

                //Found correct user
                deferred.resolve({
                    _id: rows[0].uid,
                    username: rows[0].username,
                    firstName: rows[0].firstName,
                    lastName: rows[0].lastName,
                    email: rows[0].email,       //add this in main code and database
                    phone: rows[0].phone,        //add this in main code and database
                    userRole: rows[0].role,
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

function checkIsSuperadmin(userId) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
        
        connection.query("select * from superadmin WHERE uid = ?", [userId], function(err, rows) {
            connection.release();
            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            } else if(rows.length > 0) {
                deferred.resolve("superadmin");
            } else {
                deferred.resolve();
            }
        });
    });

    return deferred.promise;
}

function checkIsAdmin(userId) {
    var deferred = Q.defer();

     pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
        connection.query("select * from admin WHERE uid = ?", [userId], function(err, rows) {
            console.log(rows);
            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            } else if(rows.length > 0) {
                deferred.resolve("admin");
            } else {
                deferred.resolve();
            }
        });
    });

    return deferred.promise;
}

function checkIsStudent(userId) {
    var deferred = Q.defer();
    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query("select * from student WHERE uid = ?", [userId], function(err, rows) {
            connection.release();
            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            } else if(rows.length > 0) {
                deferred.resolve("student");
            } else {
                deferred.resolve("user");
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
            //connection.release();

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
            var user = _.omit(userParam, 'password');
            user.hashPass = bcrypt.hashSync(userParam.password, 10);

            user.role = 'user';

            //var user = {username: userParam.username, email: userParam.email, phone: userParam.phone, firstName: userParam.firstName, lastName: userParam.lastName};

            connection.query("insert into users set ?", user, function(err, rows) {
                connection.release();
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
            
            rows = _.map(rows, function(row) {
                return _.omit(row, 'hashPass');
            });

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

        connection.query("DELETE FROM users WHERE uid = ?", [userId], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();

        });
    });
    return deferred.promise;
}

function getUserById(userId) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Getting user: " + userId);

        connection.query("select * from users WHERE id = ?", [userId], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve(rows);

        });
    });
    return deferred.promise;    
}