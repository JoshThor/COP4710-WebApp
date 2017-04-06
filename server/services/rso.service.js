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
service.getJoinable = getJoinable;
service.getForUser = getForUser;

module.exports = service;

//Create a rso //Modify these
function create(rsoParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        //rsoParam.rsoName may change
        connection.query("select * from rso WHERE rsoName = ?", [rsoParam.rsoName], function(err, rows) {

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if(rows.length > 0 )
            {
                deferred.reject('RSO name "' + rsoParam.rsoName + '" is already taken');
            } else {
                makeAdmin();
            }

        });

        function makeAdmin() {

            //update role of user to admin
            connection.query("UPDATE users SET role = ? WHERE uid = ? AND role != ?", ["admin", rsoParam.uid, "superadmin"], function(err, rows) {
                if(err) {
                    deferred.reject(err.name +": "+ err.message);
                }

                if(rows.length > 0)
                    console.log("Updated user "+ rows[0].uid+" role to admin..");

            });

            connection.query("select * from admin WHERE uid  = ?", [rsoParam.uid], function(err, rows) {

                if(err) {
                    deferred.reject(err.name + ": " + err.message);
                } else if (rows.length < 1) {

                    var admin = {uid: rsoParam.uid, unid: rsoParam.unid};

                    connection.query("insert into admin set ?", [admin], function(err, rows) {
                        if(err){
                            deferred.reject(err.name +": "+err.message);
                        }
                    });


                }
                createRSO();

            });

        }

        function createRSO() {

            var rso = {uid: rsoParam.uid, unid: rsoParam.unid, rsoName: rsoParam.rsoName};
            
            //maybe use a procedure here instead of a sql statement
            connection.query("insert into rso set ?", [rso], function(err, rows) {
                connection.release();
                if(err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                if(!err) {

                    var rsoMember = {uid: rsoParam.uid, rid: rows.insertId};

                    console.log("Adding uid: " + rsoParam.uid+" to rid: "+rows.insertId +" member group");

                    connection.query("INSERT INTO rsoMembers SET ?", [rsoMember], function(err, rows) {
                        if(err) {
                            deferred.reject(err.name + ': ' + err.message);
                        }
                    });

                    deferred.resolve();
                } else {
                    deferred.reject("Error");
                }
            });

            console.log("Created RSO: "+rsoParam.rsoName);
        }
    });
    return deferred.promise;
}

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

//Get all rso's that the user is an admin of
function getForUser(uid){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Getting all rso's...");

        connection.query("select * from rso where uid = ? AND rsoStatus = ?", [uid, 'Active'], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve(rows);

        });
    });
    return deferred.promise;
}

//Get all rso's that the current user is not in
function getJoinable(uid){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Getting all rso's for the user: "+uid);

        connection.query("SELECT r.rid, r.unid, r.rsoName FROM rso r WHERE NOT EXISTS (SELECT * FROM rsoMembers WHERE r.rid = rid AND uid = ?)", [uid], function(err, rows) {
            //console.log(rows);
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

        console.log(rsoId, userId);

        connection.query("select * from student WHERE uid = ?", userId, function(err, rows) {
           if(err) {
               deferred.reject(err.name+ ": " + err.message);
           }

           console.log(rows);

           //if user is not a student
           if(rows.length == 0 || rows == undefined || rows == null) {
               makeStudent();
           }
           insertMember();
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

                connection.query("UPDATE users SET role = ? WHERE uid = ? AND role = ?", ['student', userId, 'user'], function(err, rows){
                     if(err) {
                        deferred.reject(err.name + ': ' + err.message);
                    }
                });

                //maybe use a procedure here instead of a sql statement
                connection.query("insert into student set ?", [student], function(err, rows) {
                    if(err) {
                        deferred.reject(err.name + ': ' + err.message);
                    }
                });

            });
        }

        function insertMember(){

            console.log("user Id: " + userId +", joining rso: " + rsoId);
            var rso = {rid: rsoId, uid: userId};

            connection.query(`INSERT INTO rsoMembers set ?`, [rso], function(err, rows) {
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

//Delete a rso
function _delete(rsoId){
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {

        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log("Deleting rso: " + rsoId);

        connection.query("DELETE FROM rso WHERE rid = ?", [rsoId], function(err, rows) {
            connection.release();

            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();

        });
    });
    return deferred.promise;
}
