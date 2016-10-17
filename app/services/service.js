'use-strict';

var AppPath = require('rfr');
var routes  = AppPath('/services/routes');
var _       = require('lodash-node');
var factory = AppPath('/model/modelFactory');


var routerArray = [
	{route : 'user',   name : 'Users'},
	{route :'userrole',name : 'UserRole'},
	{route :'category',name : 'Category'},
	{route :'reply',   name : 'Reply'},
	{route :'question',name : 'Questions'}
];

var AppConfig = {
	routeName : String,
	routeUrl,
	modelName : String
};

var initConfiguration = function(routeName,modelName){

	AppConfig.routeName = routeName;
	AppConfig.routeUrl  = routes.RouteUrl(routeName);
	AppConfig.modelName = modelName;
	AppConfig.model     = factory.GetModelByName(modelName);

	return AppConfig;

};

module.exports = {
	InitConfiguration : initConfiguration
	RouterArray       : routerArray
};



