const express = require('express');

const router = express.Router();
const songsModel = require('./../models/songs');
const auth = require('./../middlewares/auth');

router.use(auth);

router.get('/', (req, res) => {
  res.status(200).send(req.user);
});

router.get('/songs', (req, res) => songsModel.listByUser(req.user.id)
  .then(songs => res.json(songs)));

module.exports = router;
