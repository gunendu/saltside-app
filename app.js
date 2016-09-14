var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

var ErrorHandler = require('./handlers/error-handlers');
var utils = require('./routes/utils');
var errorCodes = require('./routes/errors');

var saltside = require('./routes/saltside');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());

app.use(function (req, res, next) {
  console.log("http method",req.method,req.url);
  next();
});

app.use('/', saltside);

app.use(ErrorHandler.clientErrorHandler);

module.exports = app;
