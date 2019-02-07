const express = require('express');
const passport = require('../middlewares/passport');
const auth = require('../middlewares/auth');
const usersModel = require('./../models/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { username: 'spy' });
});

router.get('/logged', auth, (req, res) => {
  res.render('index', { username: req.user.username });
});

router.get('/login', (req, res) => {
  res.json('You got the login page!\n');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) { return res.status(400).json(info.message); }
    if (err) { return next(err); }
    if (!user) { return res.status(401).json(); }
    return req.login(user, (err2) => {
      if (err2) { return next(err2); }
      return res.status(200).json();
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json();
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  return usersModel.create(username, password)
    .then(newUser => res.json(newUser))
    .catch(error => res.status(409).json(error.message));
});

module.exports = router;
