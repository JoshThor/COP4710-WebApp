var config = require('config.json');
var express = require('express');
var router = express.Router();
var commentService = require('services/comment.service');
 
// routes change these
router.post('/create', create);
//router.post('/register', register);
router.get('/:id', getAll);
router.delete('/:id', _delete);

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
    commentService._delete(req.params.id, req.body.uid)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

