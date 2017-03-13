var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var pool = require('../db');


var service = {};
 
service.create = create;
service.getAll = getAll;
service._delete = _delete;

module.exports = service;

//Create a rso //Modify these
function create(rsoParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
       
        //rsoParam.name may change
        connection.query("select * from rso WHERE rsoName = ?", [rsoParam.name], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if(rows.length > 0 )
            {
                deferred.reject('RSO name "' + rsoParam.name + '" is already taken');
            } else {
                createRSO();
            }

        });


        function createRSO() {

            //change these
            var rso = {rid: rsoParam._id, uid: rsoParam.userId, unid: rsoParam.unid, name:rsoParam.name};

            //maybe use a procedure here instead of a sql statement
            connection.query("insert into rso set ?", [rso], function(err, rows) {
                if(err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                deferred.resolve();
            });
        }
    });
    return deferred.promise;
}

//Get all rso's
function getAll(){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Getting all rso's...");

        connection.query("select * from rso", function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve(rows);

        });
    });
    return deferred.promise;
}

//Delete a rso
function _delete(rsoId){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Deleting rso: " + rsoId);

        connection.query("DELETE FROM rso WHERE id = ?", [rsoId], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();

        });
    });
    return deferred.promise;
}