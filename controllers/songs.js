var express = require('express');
var router = express.Router();
var songsModel = require('./../models/songs');
var auth = require('./../middlewares/auth');

router.use(auth);

router.get('/', function(req, res, next) {
  return songsModel.list()
    .then((songs) => res.json(songs));
});

router.get('/:id', function(req, res, next) {
  return songsModel.get(req.params.id)
    .then((song) => res.json(song));
});

router.post('/', function(req, res, next) {
  return songsModel.create(req.user.id, req.body.songName, req.body.artistName, req.body.lyrics, req.body.chords)
    .then(() => res.status(200).send(), error => res.status(400).send(error.message));
});

router.delete('/:id', function(req, res, next) {
  return songsModel.delete(req.params.id)
    .then(() => res.status(200).send());
});

module.exports = router;
