var config = require('config.json');
var express = require('express');
var router = express.Router();
var rsoService = require('services/rso.service');
 
// routes change these
router.post('/create', create);
router.get('/', getAll);
router.post('/join/:id', join);
router.delete('/:id', _delete);

 
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
    rsoService.join(req.params.id, req.body.uid)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function (err){
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