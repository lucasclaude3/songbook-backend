var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var uuid = require('uuid/v4');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var knex = require('knex')(require('./knexfile'));
var { saltHashPassword } = require('./models/users');

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    knex('users')
      .where('username', username)
      .first()
      .then((user) => {
        console.log(user);
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


var indexController = require('./controllers/index');
var usersController = require('./controllers/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add & configure middleware
app.use(session({
  genid: (req) => {
    return uuid(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', indexController);
// app.use('/users', usersController);

// create the login get and post routes
app.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
