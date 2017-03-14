var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');


router.post('/create', create);
router.get('/', getAll);
router.get('/private/:id', getPrivateEvents);
router.get('/public', getPublicEvents);
router.get('/rso/:id', RSOEvents);              //router.get('/rso/:id', RSOEvents); 
router.post('/approve/:id', approveEvents);
router.delete('/:id', _delete);

 
module.exports = router;

function create(req, res) {
    eventService.create(req.body)
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
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPrivateEvents(req, res) {
    eventService.getPrivateEvents(req.params.id)
        .then(function(events) {
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPublicEvents(req, res) {
    eventService.getPublicEvents()
        .then(function(events) {
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function RSOEvents(req, res) {
    eventService.getRSOEvents(req.params.id)        //either in the body or in the paramaters
        .then(function(events) {
            res.send(events);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function approveEvents(req, res) {
    eventService.approveEvents(req.params.id, req.body.status)
        .then(function() {
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
