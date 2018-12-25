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

router.get('/songs/:songId', (req, res) => songsModel.getByUser(req.user.id, req.params.songId)
  .then(song => res.json(song)));

router.post('/songs', (req, res) => songsModel.create(req.user.id, req.body.songName, req.body.artistName, req.body.lyrics, req.body.chords)
  .then(songId => res.status(200).send(songId), error => res.status(400).send(error.message)));

router.delete('/songs', (req, res) => songsModel.deleteByUser(req.user.id, req.body.songId)
  .then(() => res.status(200).send(), error => res.status(400).send(error.message)));

module.exports = router;
