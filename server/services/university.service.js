var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var pool = require('../db').pool;


var service = {};
 
service.create = create;
service.getAll = getAll;
service._delete = _delete;

module.exports = service;

function create(univParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query("select * from rso WHERE rsoName = ?", [univParam.unName], function(err, rows) {

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if(rows.length > 0 )
            {
                deferred.reject('University name "' + univParam.unName + '" is already taken');
            } else {
                createUniversity();
            }

        });

        function createUniversity() {

            //change these
            var university = {uid: unName.uid, unName: univParam.unName, location: univParam.location, description: univParam.description, numStudents: univParam.numStudents};
            
            //maybe use a procedure here instead of a sql statement
            connection.query("insert into university set ?", [university], function(err, rows) {
                connection.release();
                if(err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                Console.log("Created University: "+univParam.unName+" With unid: " + rows.insertId);

                deferred.resolve();
            });
        }
    });
    return deferred.promise;
}



//Get all rso's that the current user is not in 
function getAll(){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Getting all Universitys...");

        connection.query("select * from university", function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve(rows);

        });
    });
    return deferred.promise;
}

function _delete(unid) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("DELETE FROM university WHERE unid = ? ",[unid], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }
            console.log("University ID: "+ unid +" was deleted");
            deferred.resolve();

        });

    });
    return deferred.promise;    
}

