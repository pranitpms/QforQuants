
'use-strict';

var express        = require('express');
var morgan         = require('morgan');             // log requests to the console (express4)
var bodyParser     = require('body-parser');        // pull information from HTML POST (express4)
var methodOverride = require('method-override'); 

var app  = express();

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));
app.use(methodOverride);

module.exports = {
		ServerConfig : function(){
		return app;
	}
};