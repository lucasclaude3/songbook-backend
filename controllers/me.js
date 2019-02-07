const express = require('express');

const router = express.Router();
const songsModel = require('./../models/songs');
const auth = require('./../middlewares/auth');

router.use(auth);

router.get('/', (req, res) => {
  res.status(200).json(req.user);
});

router.get('/songs', (req, res) => songsModel.listByUser(req.user.id)
  .then(songs => res.json(songs)));

router.get('/songs/:songId', (req, res) => songsModel.getByUser(req.user.id, req.params.songId)
  .then(song => res.json(song)));

router.post('/songs', (req, res) => songsModel.create(req.user.id, req.body.songName, req.body.artistName, req.body.lyrics, req.body.chords)
  .then(([songId]) => res.status(200).json(songId), error => res.status(400).json(error.message)));

router.delete('/songs', (req, res) => songsModel.deleteByUser(req.user.id, req.body.songId)
  .then(() => res.status(200).json(), error => res.status(400).json(error.message)));

module.exports = router;
