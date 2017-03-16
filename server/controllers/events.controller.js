var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');

//routes
//All of these routes can be called using the http://localhost:3000/events/ URI followed by one of the routes below:

//Creates an event
//URI: http://localhost:3000/events/create
router.post('/create', create);

//Gets all event
//URI: http://localhost:3000/events/
router.get('/', getAll);

//Gets all private events for a specific university id
//URI: http://localhost:3000/events/private/:id
//Example: http://localhost:3000/events/private/1 gets all private events that belong to the unid 1
router.get('/private/:id', getPrivateEvents);


//Gets all public events 
//URI: http://localhost:3000/events/public
router.get('/public', getPublicEvents);

//Gets all RSO events for a specific rso id
//URI: http://localhost:3000/events/rso/:id
//Example: http://localhost:3000/events/rso/1 gets all private events that belong to the rid 1
router.get('/rso/:id', RSOEvents);

//approve an event (only superadmins can approve)
//URI: http://localhost:3000/events/approve/:id
//Example: http://localhost:3000/events/approve/1 approves the event with eid = 1
router.post('/approve/:id', approveEvents);

//delete an event
//URI: http://localhost:3000/events/:id
//Example: http://localhost:3000/events/1 deletes the event with eid = 1
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
