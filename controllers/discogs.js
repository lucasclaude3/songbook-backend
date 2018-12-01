const express = require('express');
const disconnect = require('disconnect');

const router = express.Router();
const DiscogsClient = disconnect.Client;
const discogs = new DiscogsClient();

router.get('/search', (req, res) => {
  const col = discogs.user().collection();
  col.getReleases('lucasc88', 0, { page: 1, per_page: 5 })
    .then((data) => { res.status(200).send(data); });
});

module.exports = router;
