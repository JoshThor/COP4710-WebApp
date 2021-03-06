var config = require('config.json');
var express = require('express');
var router = express.Router();
var commentService = require('services/comment.service');

//routes
//All of these routes can be called using the http://localhost:4000/comments/ URI followed by one of the routes below: 

//Create a comment for an event
//needs the user id and the event id in the body of the request
//URI: http://localhost:4000/comments/create
router.post('/create', create);

//Same thing as comment pretty much just updating comment and rating
router.post('/update', update);

//gets all comments for an event
//needs the event id
//URI: http://localhost:4000/comments/:id
//Example: http://localhost:4000/comments/3 gets all comments for the event with eid = 3
router.get('/:id', getAll);

//deletes a users comment for an event
//needs the event id and user id
//URI: http://localhost:4000/comments/:id
//Example: http://localhost:4000/comments/3 deletes a comment for the event with eid = 3 and user id would be in the body of the request
router.delete('/:eid/:uid/:time', _delete);

module.exports = router;

function create(req, res) {
commentService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
commentService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
commentService.getComments(req.params.id)
        .then(function (comments) {
            if (comments) {
                
                // authentication successful
                res.send(comments);
            } else {
                // authentication failed
                res.send("No Comments found");
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    commentService._delete(req.params.eid, req.params.uid, req.params.time)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

