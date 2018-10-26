var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var knex = require('knex')(require('../knexfile'));
var { saltHashPassword } = require('../models/users');

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    knex('users')
      .where('username', username)
      .first()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'This username does not exist.\n' });
        }
        var { salt, hash } = saltHashPassword(password, user.salt);
        if (hash !== user.encryptedPassword) {
          return done(null, false, { message: 'The password is incorrect.\n' });
        }
        return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  knex('users')
    .where('username', username)
    .first()
    .then(res => { done(null, res); } )
    .catch(error => done(error, false))
});

module.exports = passport;
