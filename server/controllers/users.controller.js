var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
 
// routes
//All of these routes can be called using the http://localhost:4000/users/ URI followed by one of the routes below:

//Authenticate a user
//URI: http://localhost:4000/users/authenticate
router.post('/authenticate', authenticate);

//register a user
//URI: http://localhost:4000/users/register
router.post('/register', register);

//Gets all users
//URI: http://localhost:4000/users/
router.get('/', getAll);

//Delete a user
//URI: http://localhost:4000/users/:id
//Example:http://localhost:4000/users/1 deletes user with the uid 1
router.delete('/:id', _delete);

//Gets a user with the specified id
//URI: http://localhost:4000/users/:id
//Example:http://localhost:4000/users/1 gets user with the uid 1
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
 

 

 

 
