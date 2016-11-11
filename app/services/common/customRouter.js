'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var RegisterService = AppPath('/services/common/registerService')


var createCustomRoute = function(){
	RegisterService.Register('router','reply');
};



module.exports = {
	CreateCustomRoute : createCustomRoute
}