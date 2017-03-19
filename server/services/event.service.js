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

        var event = {uid: eventParam.uid, eventName: eventParam.name, timedate: eventParam.time, category: eventParam.category, 
            description: eventParam.description, latitude: eventParam.latitude, longitude: eventParam.longitude};

        connection.query("INSERT INTO _events SET ?", [event], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

            deferred.resolve();
            //now we want to determine what kind of event? public, private, rso ect..

        });

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

             deferred.resolve(rows);

        });

    });
    return deferred.promise;
}


//Change to User Id

function getPrivateEvents(uid) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e, privateEvent p, student s WHERE p.eid = e.eid AND p.unid = s.unid AND s.uid = ?", [uid], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }

             deferred.resolve(rows);

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
    
        connection.query("SELECT e.eid, e.eventName, e.description, e.category, e.latitude, e.longitude, e.timedate FROM _events e, publicEvent p WHERE p.eid = e.eid", function(err, rows) {
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