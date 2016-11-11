
var express    = require('express');
var favicon    = require('serve-favicon');
var rootPath   = require('rfr');
var AppPath    = rootPath('/app/appConfig');
var path       = require('path');

var loadStaticResource = function(app){

	var applicationPath = path.join(AppPath.root, 'client','application');

	console.log('applicationPath : ' + applicationPath);
	app.use(express.static(path.join(AppPath.root,'client')));
	app.use(express.static(path.join(applicationPath,'admin')));
	app.use(express.static(path.join(applicationPath,'home')));
	app.use(express.static(path.join(applicationPath,'question')));
	app.use(express.static(path.join(applicationPath,'signup')));
	app.use(express.static(path.join(applicationPath,'users')));

	app.use('/style',express.static(path.join(AppPath.root, 'client','contents')));
	app.use('/script',express.static(path.join(AppPath.root, 'client','script')));
	app.use('/fonts',express.static(path.join(AppPath.root, 'client','font-awesome')));
	app.use('/app',express.static(applicationPath));
	app.use('/bower_components',express.static(path.join(rootPath.root, 'bower_components')));
	app.use(favicon(path.join(AppPath.root,'client','favicon.ico')));

};

module.exports = {
	LoadStaticResource : loadStaticResource
}
