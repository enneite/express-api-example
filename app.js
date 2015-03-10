var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nconf = require('nconf');

nconf.file('auth', __dirname +  "/configs/" + global.APPLICATION_ENV + "/auth.json");


// new requirements for this application :
var engine = require('ejs-locals');
var bootloader = require('express-bootloader');
// locals modules :
var initRoutes = require('./routes/init-routes');

var app = express();

// view engine setup
// use ejs-locals for all ejs templates : it's better to integrate layout in template architecture
app.engine('ejs', engine);

bootloader.init(app, __dirname, "/configs/" + global.APPLICATION_ENV + "/bootloader.json");



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


initRoutes.init(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'Error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
