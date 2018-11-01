var express = require('express');
var router = express.Router();
var usersModel = require('./../models/users');
var auth = require('./../middlewares/auth');

router.use(auth);

router.get('/', function(req, res, next) {
  return usersModel.list()
    .then((users) => res.json(users));
});

router.get('/:id', function(req, res, next) {
  return usersModel.get(req.params.id)
    .then((user) => res.json(user));
});

router.post('/', function(req, res, next) {
  return usersModel.create(req.body.username, req.body.password)
    .then(() => res.status(200).send(), error => res.status(400).send(error.message));
});

router.delete('/:id', function(req, res, next) {
  return usersModel.delete(req.params.id)
    .then(() => res.status(200).send());
});

module.exports = router;
