var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var pool = require('../db').pool;

var service = {};

service.create = create;
service.getAll = getAll;
service.getPrivateEvents = getPrivateEvents;
service.getPublicEvents = getPublicEvents;
service.getRSOEvents = getRSOEvents;
service.approveEvents = approveEvents;
service.getUnapprovedEvents = getUnapprovedEvents;
service._delete = _delete;

module.exports = service;

//Create a event
function create(eventParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log(eventParam);

        if(eventParam.type == 'RSO')
        {
            eventParam.status = 'Approved';
        }
        else
        {
            eventParam.status = 'Unapproved';
        }

        var event = {
            uid: eventParam.uid,
            eventName: eventParam.name,
            timedate: eventParam.time,
            category: eventParam.category, 
            description: eventParam.description,
            latitude: eventParam.latitude,
            longitude: eventParam.longitude,
            eventStatus: eventParam.status
            };

            /*
            * Determine what kind of event it is (private, public, RSO)
            * Some sort of if-else statment
            * if private: you need university ID
            * if public dont require anything special
            * if RSO require RSO ID
            * put these in different functions
            */

        connection.query("INSERT INTO _events SET ?", [event], function(err, rows) {

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

            if(rows === null || rows === undefined)
            {
                console.log("Error");
                deferred.reject("Error");
                deferred.resolve();
            }

            //eventParam.type must be passed to this function
            switch(eventParam.type)
            {
                case 'RSO':
                    insertRSO(rows.insertId);
                    break;
                case 'Private':
                    insertPriv(rows.insertId);
                    break;
                case 'Public':
                    insertPub(rows.insertId);
                    break;
                default:
                    console.log("Incorrect Event type...");
                    deferred.resolve();
                    break;
            }
        });

        function insertPub(eid)
        {
            console.log("Inserting event id: "+eid+" into the public table.");

            connection.query("INSERT INTO publicEvent SET eid = ?", [eid], function(err, rows) {
                connection.release();

                if(err){
                    deferred.reject(err.name +": "+ err.message);
                }

                deferred.resolve();
            });
        }
    
        function insertPriv(eid)
        {

            connection.query("SELECT unid from admin WHERE uid = ?", [eventParam.uid], function(err, rows) {
                if(err){
                    connection.release();
                    deferred.reject(err.name +": "+ err.message);
                }

                console.log("Inserting event id: "+eid+" into the private event table.");
                //console.log(rows[0].unid);
                var private = {eid: eid, unid: rows[0].unid};

                connection.query("INSERT INTO privateEvent SET ?", [private], function(err, rows) {
                    connection.release();

                    if(err){
                        deferred.reject(err.name +": "+ err.message);
                    }

                    deferred.resolve();
                });
            });
            
            
        }

        function insertRSO(eid)
        {
            var rso = {eid: eid, rid: eventParam.rid};
            console.log("Inserting event id: "+eid+" into the RSOEvent table.");

            connection.query("INSERT INTO rsoEvent SET ?", [rso], function(err, rows) {
                connection.release();

                if(err){
                    deferred.reject(err.name +": "+ err.message);
                }

                deferred.resolve();
            });
        }

    });
    return deferred.promise;
}


function getAll() {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("SELECT * FROM _events", function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

            var index = rso.insertId;

             deferred.resolve(rows);

        });

    });
    return deferred.promise;
}


//Change to User Id

function getPrivateEvents(uid) {
    var deferred = Q.defer();
    console.log(uid);

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query(`SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e, privateEvent p, student s
            WHERE p.eid = e.eid AND e.eventStatus = 'Approved' AND (p.unid = s.unid AND s.uid = ?)`, uid, function(err, rows) {

                if(err){
                    deferred.reject(err.name +": "+ err.message);
                } else if(rows.length > 0){
                     deferred.resolve(rows);
                }else{
                    connection.query(`SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e, privateEvent p, admin a 
                        WHERE p.eid = e.eid AND e.eventStatus = 'Approved' AND (p.unid = a.unid AND a.uid = ?)`, uid, function(err, rows) {

                    connection.release();

                    if(err){
                        deferred.reject(err.name +": "+ err.message);
                    }
                    deferred.resolve(rows);

                    });
                }
            });

    });
    return deferred.promise;    
}

function getPublicEvents() {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e, publicEvent p WHERE p.eid = e.eid AND e.eventStatus = ?", 'Approved', function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

             deferred.resolve(rows);

        });

    });
    return deferred.promise;    
}

//query databse for user id
function getRSOEvents(uid) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e, rsoEvent r, rsoMembers m WHERE r.eid = e.eid AND r.rid = m.rid AND m.uid = ?", [uid], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

             deferred.resolve(rows);

        });

    });
    return deferred.promise;    
}

function approveEvents(eid, status) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("UPDATE _events SET eventStatus = ? WHERE eid = ?", [status, eid], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }
            console.log("Event ID: "+ eid +" updated with status: "+ status);
            deferred.resolve();

        });

    });
    return deferred.promise;    
}

function _delete(eid) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("DELETE FROM _events WHERE eid = ? ",[eid], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }
            console.log("Event ID: "+ eid +" was deleted");
             deferred.resolve();

        });

    });
    return deferred.promise;    
}


function getUnapprovedEvents() {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e WHERE e.eventStatus = ?", ['Unapproved'], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

             deferred.resolve(rows);

        });

    });
    return deferred.promise;    
}