var express = require('express');
var router = express.Router();
var passport = require('../middlewares/passport');
var auth = require('../middlewares/auth');

router.get('/', function(req, res, next) {
  res.render('index', { username: 'spy' });
});

router.get('/logged', auth, function(req, res, next) {
  res.render('index', { username: req.user.username });
});

router.get('/login', (req, res) => {
  res.send(`You got the login page!\n`);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) { return res.send(info.message); }
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/logged');
    })
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
