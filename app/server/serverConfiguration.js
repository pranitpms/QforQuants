
'use-strict';

var path       = require('path')
var express    = require('express');
var morgan     = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');       // pull information from HTML POST (express4)
var app        = express();
var rootPath   = require('rfr');
var AppPath    = rootPath('/app/appConfig');
var Static     = AppPath('/server/staticConfig');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));

Static.LoadStaticResource(app);

module.exports = app;