const express = require('express');
const songsModel = require('./../models/songs');
const auth = require('./../middlewares/auth');

const router = express.Router();
router.use(auth);

router.get('/', (req, res) => songsModel.list()
  .then(songs => res.json(songs)));

router.get('/:id', (req, res) => songsModel.get(req.params.id)
  .then(song => res.json(song)));

router.post('/', (req, res) => songsModel.create(req.user.id, req.body.songName, req.body.artistName, req.body.lyrics, req.body.chords)
  .then(() => res.status(200).json(), error => res.status(400).json(error.message)));

router.delete('/:id', (req, res) => songsModel.delete(req.params.id)
  .then(() => res.status(200).json()));

module.exports = router;
