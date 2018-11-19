var express = require('express');
var router = express.Router();

var Discogs = new require('disconnect').Client;
var discogs = new Discogs();

router.get('/search', function(req, res, next) {
    var col = discogs.user().collection();
    col.getReleases('lucasc88', 0, { page: 1, per_page: 5 })
        .then(data => { res.status(200).send(data) });
    ;
});

module.exports = router;
