var config = require('config.json');
var express = require('express');
var router = express.Router();
var univService = require('services/university.service');
 
// routes change these
//All of these routes can be called using the http://localhost:4000/university/ url followed by one of the routes below:

// Creates a University
//URL: http://localhost:4000/university/create
router.post('/create', create);

// Gets all Universitys
//URL: http://localhost:4000/university/
router.get('/', getAll);

// Delete a University
//URL: http://localhost:4000/university/:id
//Example:  http://localhost:4000/university/3 would delete the University with unid 3
router.delete('/:unid', _delete);

 
module.exports = router;


function create(req, res) {
    univService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    univService.getAll()
        .then(function (univ) {
            res.send(univ)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    univService._delete(req.params.unid)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}