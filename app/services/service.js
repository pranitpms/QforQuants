'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var routes  = AppPath('/services/routes');
var _       = require('lodash-node');
var factory  = AppPath('/model/modelFactory');



var routerArray = [
	{route : 'user',   name : 'Users'},
	{route :'userrole',name : 'UserRole'},
	{route :'category',name : 'Category'},
	// {route :'reply',   name : 'Reply'},
	{route :'question',name : 'Questions'}
];



var initConfiguration = function(routeName,modelName){
	var AppConfig = {
		routeName  : String,
		routeUrl   : {},
		modelName  : String,
		model      : {},
		primaryKey : String
	};
	AppConfig.routeName  = routeName;
	AppConfig.routeUrl   = routes.RouteUrl(routeName);
	AppConfig.modelName  = modelName;
	AppConfig.model      = factory.GetModelByName(modelName);
	return AppConfig;  
};

module.exports = {
	InitConfiguration : initConfiguration,
	RouterArray       : routerArray
};



