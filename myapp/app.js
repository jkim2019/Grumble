'use strict';

var express = require('express');
var path = require('path'); // to work with relative file paths
var logger = require('morgan'); // logging info to console
var cookieParser = require('cookie-parser'); // handling cookies
var bodyParser = require('body-parser'); // used for parsing text/JSON bodies

var index = require('./routes/index');

var app = express(); // initializes app to use express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // ejs used for view engine

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// setup how data is logged and parsed
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// points to index.js when '/' requested
// when adding a new .ejs (page), also add .js and connect w/ this file
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err); // passes to next error handler
});


// error handler (general, for when we get a bug)
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
