'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var ServiceRegistrar = AppPath('/services/common/registerService')


var createCustomRoute = function(){
	ServiceRegistrar.RegisterService('router','reply');
};

var routeDecorator = function(router,routeName,model){
	ServiceRegistrar.RegisterService('decorator',routeName,model,router);
}



module.exports = {
	CreateCustomRoute : createCustomRoute,
	RouteDecorator    : routeDecorator
}