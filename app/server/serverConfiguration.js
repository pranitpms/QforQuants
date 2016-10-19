
'use-strict';

var express    = require('express');
var morgan     = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');        // pull information from HTML POST (express4)
var AppPath    = require('rfr');
var app        = express();

app.use(express.static(AppPath.root + '/client'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));

module.exports = app;