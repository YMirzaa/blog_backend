var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./src/config/passport');
require('./src/config/mongo');

const authModule = require('./src/controllers/authController');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();
// view engine setup
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.post('/signup', authModule.signup);
app.post('/login', authModule.login);
app.post('/logout', authModule.logout);
app.use(
    '/deneme',
    passport.authenticate('jwt', { session: false }),
    usersRouter
);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development

    res.status(err.status || 500);
    res.json({ error: err, message: err.message });
});

module.exports = app;
