'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var RouterService = AppPath('/services/common/routerService')


var register = function(serviceName,type,instance){
	switch(serviceName){
		case 'router' : RouterService.Register(type);
	}
};



module.exports = {
	Register : register
}