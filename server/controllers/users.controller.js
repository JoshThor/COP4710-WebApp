var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
 
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.delete('/:id', _delete);
router.get('/:id', getUserById);

 
module.exports = router;
 
function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send("Username or password is incorrect");
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService._delete(req.params.id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getUserById(req, res) {
    userService.getUserById(req.params.id)
        .then(function (user) {
            res.send(user)
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 

 

 

 