'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var service       = AppPath('/services/service');
var CreateRoutes  = AppPath('/services/baseRouter');
var app           = AppPath('/server/serverConfiguration');
var _             = require('lodash-node');
var CustomConfig  = AppPath('/services/common/customRouter');

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
	CustomConfig.CreateCustomRoute();
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