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
		var getdata = {};
		getdata = service.InitConfiguration(obj.route,obj.name);
		config.push(getdata);
	})

	var routers = CreateRoutes(config);
	registerRoutes(routers);
};

var registerRoutes = function(routers){

	_.forEach(routers,function(router){
		registerRoute(router.name,router.routes);
	})
};

var registerRoute = function(name, route){
	app.use(name, route);
};

module.exports = {
	InitRouteConfig : initRouteConfig,
	RegisterRoutes  : registerRoutes,
	RegisterRoute   : registerRoute
}