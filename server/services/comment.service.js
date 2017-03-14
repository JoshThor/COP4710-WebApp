var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var pool = require('../db').pool;

var service = {};
 
service.create = create;
service.getComments = getComments;
service._delete = _delete;

module.exports = service;

//Create a event
function create(commentParam) {

    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        console.log(commentParam);

        connection.query("insert into comments set ?", [commentParam], function(err, rows) {
            connection.release();
            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            //comment posted successful
            deferred.resolve();
        });
    });
    return deferred.promise;
}

function getComments(eventId) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }

        connection.query("select * from comments WHERE eid = ?", [eventId], function(err, rows) {
            connection.release();
            if(err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if(rows && rows.length > 0)
            {
                //comments found
                deferred.resolve(rows);
            } else {

                //no comments found
                deferred.resolve();
            }

        });
    });
    return deferred.promise;
}

function _delete(eid, uid) {
    var deferred = Q.defer();

    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            deferred.reject(err.name + ': ' + err.message);
        }
    
        connection.query("DELETE FROM comments WHERE eid = ? AND uid = ?", [eid, uid], function(err, rows) {
            connection.release();

            if(err){
                deferred.reject(err.name +": "+ err.message);
            }
            console.log("Comment was deleted");
             deferred.resolve();

        });

    });
    return deferred.promise;    
}
