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

		var model = obj.model;
		var serviceUri = obj.routeUrl;
		var routeName = obj.routeName;

		var routes = create(routeName,model,serviceUri);

		if(router){
			var json = {
				name   : '/' + routeName,
				routes : routes
			}
			routeTable.push(json);
		}
	})
};

var create = function(routeName,model,serviceUri){
	var router  = express.Router();

	router.use(function timelog(req,res,next){
		console.log('Logging for the route: ' + routeName);
		console.log('Time : ', Date.now());
		next();
	})

	router.get(serviceUri.getAll,GETALL(response,request,model));

	router.get(serviceUri.get,GET(response,request,model));

	router.get(serviceUri.get,SEARCH(response,request,model));

	router.post(serviceUri.post,POST(response,request,model));

	router.put(serviceUri.put,PUT(response,request,model));

	router.delete(serviceUri.delete,DELETE(response,request,model));

	return router;

}

module.exports = CreateRoutes;