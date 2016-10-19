
'use-strict';

var path       = require('path')
var express    = require('express');
var morgan     = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');        // pull information from HTML POST (express4)
var app        = express();
var rootPath   = require('rfr');
var AppPath    = rootPath('/app/appConfig');

app.use(express.static(AppPath.root + '/client'));
app.use('/bower_components',express.static(path.join(rootPath.root, 'bower_components')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));

module.exports = app;