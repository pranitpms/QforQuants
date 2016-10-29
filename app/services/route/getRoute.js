'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch  = AppPath('/server/dataAccess/fetch');

var GET = function(model,keyName,primaryKey){
	return getMethod(model,keyName,primaryKey);
};


var getMethod = function(model,keyName,primaryKey){
	return (function(request,response,next){
		var key  = request.params[keyName];

		var promise = Fetch.FetchById(model,key,primaryKey);

		promise.then(function(result){
			console.log(result);
			response.send(result);
		}).catch(function(error){
			return error;
		});
	});
}

module.exports = GET;