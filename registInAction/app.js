var entries = require('./routes/entries')
var Entry = require('./lib/entry')
var validate = require('./lib/middleware/validate')
var page = require('./lib/middleware/page')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var user = require('./lib/middleware/user')

var index = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/users');
var register = require('./routes/register')
var login = require('./routes/login')
var messages = require('./lib/messages.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'test'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);
app.use(messages);

// app.use('/', index);
app.use('/users', users);
app.get('/register', register.form) // login page
app.post('/register', register.submit) // login post
app.get('/login', login.form) // login page
app.post('/login', login.submit) // login post
app.get('/logout', login.logout) // logout get
app.get('/post', entries.form) // post page
app.post('/post', entries.submit) // post post
app.get('/api/user/:id', api.user)
app.post('/api/entry', entries.submit)
app.get('/api/entries/:page?', page(Entry.count), api.entries)
app.get('/:page?', page(Entry.count, 5), entries.list)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;