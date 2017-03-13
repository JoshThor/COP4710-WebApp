var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var pool = require('../db').pool;


var service = {};
 
service.create = create;
//service.getAll = getAll;
//service._delete = _delete;

module.export = service;

//Create a event
function create(eventParam) {

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

        function createEvent() {

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

