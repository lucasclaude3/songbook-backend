var express = require('express');
var router = express.Router();
var knex = require('knex')(require('./../knexfile'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  knex('users')
    .insert({
      username: req.body.username,
      password: req.body.password,
    })
    .then((result) => res.send('create a resource'));
})

module.exports = router;
