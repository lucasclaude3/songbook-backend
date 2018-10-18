var express = require('express');
var router = express.Router();
var knex = require('knex')(require('./../knexfile'));

router.get('/', function(req, res, next) {
  knex('users')
    .then((rows) => res.json(rows));
});

router.get('/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id)
    .then((result) => res.json(result));
});

router.post('/', function(req, res, next) {
  knex('users')
    .insert({
      username: req.body.username,
      password: req.body.password,
    })
    .then(() => res.sendStatus(200));
});

router.delete('/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id)
    .del()
    .then(() => res.sendStatus(200));
});

module.exports = router;
