'use-strict';

var AppPath      = require('rfr');
var service      = AppPath('/services/service');
var CreateRoutes = AppPath('/services/baseRouter');
var app          = AppPath('/server/serverConfiguration');
var _            = require('lodash-node');

var config = [];

var initRouteConfig = function(){

	var arr = service.RouterArray;
	_.forEach(arr,function(obj){
		config.push(service.InitConfiguration(obj.route,obj.name));
	})

	var routers = CreateRoutes(config);
	registerRoutes(routers);
}

var registerRoutes = function(routers){

	_.forEach(routers,function(router){
		resiterRoute(router.name,router.route);
	})
}

var registerRoute = function(name, route){
	app.use(name, route);
}

module.exports = {
	InitRouteConfig : initRouteConfig
	RegisterRoutes  : registerRoutes,
	RegisterRoute   : registerRoute
}