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
service.join = join;

module.exports = service;

//Create a rso //Modify these
function create(rsoParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

       console.log(rsoParam);

        //rsoParam.name may change
        connection.query("select * from rso WHERE rsoName = ?", [rsoParam.name], function(err, rows) {

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if(rows.length > 0 )
            {
                deferred.reject('RSO name "' + rsoParam.name + '" is already taken');
            } else {
                makeAdmin();
            }

        });

        function makeAdmin() {

            connection.query("select * from admin WHERE uid  = ?", [rsoParam.userId], function(err, rows) {

                if(err) {
                    deferred.reject(err.name + ": " + err.message);
                } else {

                    var admin = {uid: rsoParam.userId, unid: rsoParam.unid};

                    connection.query("insert into admin set ?", [admin], function(err, rows) {
                        if(err){
                            deferred.reject(err.name +": "+err.message);
                        }
                    });

                    createRSO();
                }

            });

        }

        function createRSO() {

            //change these
            var rso = {uid: rsoParam.userId, unid: rsoParam.unid, rsoName: rsoParam.name};

            //maybe use a procedure here instead of a sql statement
            connection.query("insert into rso set ?", [rso], function(err, rows) {
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

//Get all rso's that the current user is not in 
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


//join a rso
//Have the request send
function join(rsoId, userId){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query("select * from student WHERE uid = ?", userId, function(err, rows) {
           if(err) {
               deferred.reject(err.name+ ": " + err.message);
           }
           
           //if user is not a student
           if(rows.length == 0) {
               makeStudent();
           }
        });

        function makeStudent() {

            var universityID;
            connection.query("select * from rso WHERE rid = ?", [rsoId], function(err, rows) {
                
                if(err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                universityID = rows[0].unid;
        
                var student = {uid: userId, unid: universityID};

                console.log("creating student: "+ userId+", from university: " + universityID);

                //maybe use a procedure here instead of a sql statement
                connection.query("insert into student set ?", [student], function(err, rows) {
                    if(err) {
                        deferred.reject(err.name + ': ' + err.message);
                    }
                });
            
            });
        }

        console.log("user Id: " + userId +", joining rso: " + rsoId);
        var rso = {rid: rsoId, uid: userId};

        connection.query("insert into rsoMembers set ?", [rso], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();

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