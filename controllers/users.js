var express = require('express');
var router = express.Router();
var usersModel = require('./../models/users');

router.get('/', function(req, res, next) {
  return usersModel.list()
    .then((users) => res.json(users));;
});

router.get('/:id', function(req, res, next) {
  return usersModel.get(req.params.id)
    .then((user) => res.json(user));;
});

router.post('/', function(req, res, next) {
  return usersModel.create(req.body.username, req.body.password)
    .then(() => res.sendStatus(200));
});

router.delete('/:id', function(req, res, next) {
  return usersModel.delete(req.params.id)
    .then(() => res.sendStatus(200));
});

module.exports = router;
