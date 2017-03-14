var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');


router.post('/create', create);
router.get('/', getAll);
router.get('/private', getPrivateEvents);
router.get('/public', getPublicEvents);
router.get('/rso', RSOEvents);              //router.get('/rso/:id', RSOEvents);  
router.delete('/:id', _delete);

 
module.exports = router;

function create(req, res) {
eventService.getComments(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getAll(req, res) {
    eventService.getAll()
        .then(function(events) {
            res.send(events)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPrivateEvents(req, res) {
    eventService.getPrivateEvents(req.body.unid)
        .then(function(events) {
            res.send(events)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPublicEvents(req, res) {
    eventService.getPublicEvents()
        .then(function(events) {
            res.send(events)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function RSOEvents(req, res) {
    eventService.RSOEvents(req.body.rid)        //either in the body or in the paramaters
        .then(function(events) {
            res.send(events)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function approveEvents(req, res) {
    eventService.RSOEvents(req.body.eid, req.body.status)
        .then(function(events) {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    eventService._delete(req.params.id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}
