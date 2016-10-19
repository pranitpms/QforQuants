'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch  = AppPath('/server/dataAccess/fetch');

var GET = function(model,keyName){
	return getMethod(model,keyName);
};


var getMethod = function(model,keyName){
	return (function(response,request,model,keyName){
		var key  = req.params[keyName];
		var modelObj = new model();

		var promise = Fetch.FetchById(modelObj,key);
		promise.then(function(result){
			return result;
		}).
		catch(function(error){
			return error;
		});
	});
}

module.exports = GET;