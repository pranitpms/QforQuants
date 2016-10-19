'use-strict';

var express = require('express');
var _       = require('lodash-node');

var AppPath = require('rfr');
var GETALL  = AppPath('/services/route/getAllRoute');
var GET     = AppPath('/services/route/getRoute');
var SEARCH  = AppPath('/services/route/searchRoute');
var POST    = AppPath('/services/route/postRoute');
var PUT     = AppPath('/services/route/putRoute');
var DELETE  = AppPath('/services/route/deleteRoute');

var routeTable  = [];

var CreateRoutes = function(config){
	_.forEach(config,function(obj){
		var json = {
			name   : String,
			routes : {}
		}
		var route = null;
		var model = obj.model;
		var serviceUri = obj.routeUrl;
		var routeName = obj.routeName;

		route = create(routeName,model,serviceUri);
		if(route){
			json.name   = '/' + routeName;
			json.routes = route;
			routeTable.push(json);
		}
	})

	return routeTable;
};

var create = function(routeName,model,serviceUri){

	var router = express.Router();
	router.use(function timelog(req,res,next){
		console.log('Logging for the route: ' + routeName);
		console.log('Time : ', Date.now());
		next();
	})

	router.get(serviceUri.getAll,GETALL(model));

	router.get(serviceUri.get,GET(model,routeName+'id'));

	router.get(serviceUri.get,SEARCH(model));

	router.post(serviceUri.post,POST(model));

	router.put(serviceUri.put,PUT(model));

	router.delete(serviceUri.delete,DELETE(model));

	return router;
};

module.exports = CreateRoutes;