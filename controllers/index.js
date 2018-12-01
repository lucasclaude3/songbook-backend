const express = require('express');
const passport = require('../middlewares/passport');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { username: 'spy' });
});

router.get('/logged', auth, (req, res) => {
  res.render('index', { username: req.user.username });
});

router.get('/login', (req, res) => {
  res.send('You got the login page!\n');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) { return res.status(400).send(info.message); }
    if (err) { return next(err); }
    if (!user) { return res.status(401).send(); }
    return req.login(user, (err2) => {
      if (err2) { return next(err2); }
      return res.status(200).send();
    });
  })(req, res, next);
});

router.get('/me', auth, (req, res) => {
  res.status(200).send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send();
});

module.exports = router;
