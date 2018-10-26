var express = require('express');
var router = express.Router();
var auth = require('./../middlewares/auth');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('index', { username: req.user.username });
  } else {
    res.render('index', { username: 'Spy' });
  }
});

router.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
});

router.post('/login', (req, res, next) => {
  auth.authenticate('local', (err, user, info) => {
    if (info) { return res.send(info.message); }
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/');
    })
  })(req, res, next);
})

module.exports = router;
