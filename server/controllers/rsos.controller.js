var config = require('config.json');
var express = require('express');
var router = express.Router();
var rsoService = require('services/rso.service');
 
// routes change these
//All of these routes can be called using the http://localhost:4000/rsos/ url followed by one of the routes below:

// Creates an RSO
//URL: http://localhost:4000/rsos/create
router.post('/create', create);

// Gets all RSO's
//URL: http://localhost:4000/rsos/
router.get('/', getAll);

// joins an RSO
//URL: http://localhost:4000/rsos/join/:id
//Example:  http://localhost:4000/rsos/join/3 would join the rso with rid 3
router.post('/join/:rid', join);

// Delete an RSO
//URL: http://localhost:4000/rsos/:id
//Example:  http://localhost:4000/rsos/3 would delete the rso with rid 3
router.delete('/:id', _delete);

// Gets all joinable RSO's for that user (user id has to be sent in reuest)
//URL: http://localhost:4000/rsos/getall
router.get('/getJoinable/:uid', getJoinable)

// Gets all joinable RSO's for that user (user id has to be sent in reuest)
//URL: http://localhost:4000/rsos/getall
router.get('/getForUser/:uid', getForUser)

 
module.exports = router;

function create(req, res) {

    rsoService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    rsoService.getAll()
        .then(function (rsos) {
            res.send(rsos)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function join(req, res) {
    rsoService.join(req.params.rid, req.body.uid)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function (err){
            res.status(400).send(err);
        });
}

function getJoinable(req, res) {
    rsoService.getJoinable(req.params.uid)
        .then(function(rso) {
            res.send(rso)
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

getForUser

function getForUser(req, res) {
    rsoService.getForUser(req.params.uid)
        .then(function(rso) {
            res.send(rso)
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    rsoService._delete(req.params.id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}
