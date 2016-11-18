'use-strict';

var rootPath      		  = require('rfr');
var AppPath      		  = rootPath('/app/appConfig');
var RouterService 		  = AppPath('/services/common/routerService');
var RouteDecoratorService = AppPath('/services/common/routeDecoratorService');


var registerService = function(serviceName,type,instance,router){
	switch(serviceName){
		case 'router'    : RouterService.Register(type);
						  break;
		case 'decorator' : RouteDecoratorService.Register(type,instance,router);
						  break;
	}
};

module.exports = {
	RegisterService   : registerService,
}