var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');

//routes
//All of these routes can be called using the http://localhost:4000/events/ URI followed by one of the routes below:

//Creates an event
//URI: http://localhost:4000/events/create
router.post('/create', create);

//Gets all event
//URI: http://localhost:4000/events/
router.get('/', getAll);

//Gets all private events for university that a user is a student at
//URI: http://localhost:4000/events/private
router.get('/private/:uid', getPrivateEvents);


//Gets all public events 
//URI: http://localhost:4000/events/public
router.get('/public', getPublicEvents);


//~~~~
//Will change to get all RSO that the user can view so in the request send the UID
//~~~~

//Gets all RSO events for each rso that a user belongs to
//URI: http://localhost:4000/events/rso
router.get('/rso/:uid', RSOEvents);

//approve an event (only superadmins can approve)
//URI: http://localhost:4000/events/approve/:id
//Example: http://localhost:4000/events/approve/1 approves the event with eid = 1
router.post('/approve/:id', approveEvents);

//delete an event
//URI: http://localhost:4000/events/:id
//Example: http://localhost:4000/events/1 deletes the event with eid = 1
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
    eventService.getPrivateEvents(req.params.uid)
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
    eventService.getRSOEvents(req.params.uid)        //either in the body or in the paramaters
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
