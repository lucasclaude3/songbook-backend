const express = require('express');

const router = express.Router();
const usersModel = require('./../models/users');
const auth = require('./../middlewares/auth');

router.use(auth);

router.get('/', (req, res) => usersModel.list()
  .then(users => res.json(users)));

router.get('/:id', (req, res) => usersModel.get(req.params.id)
  .then(user => res.json(user)));

router.post('/', (req, res) => usersModel.create(req.body.username, req.body.password)
  .then(() => res.status(200).send(), error => res.status(400).send(error.message)));

router.delete('/:id', (req, res) => usersModel.delete(req.params.id)
  .then(() => res.status(200).send()));

module.exports = router;
