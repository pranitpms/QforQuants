'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Remove  = AppPath('/server/dataAccess/delete');

var DELETE = function(modelObj,keyName){

	return DeleteMethod(modelObj,keyName);
}

var DeleteMethod = function(modelObj,keyName){
	return (function(request,response,next){

		console.log(keyName);
		console.log('key : ' + request.params[keyName]);

		var key  = request.params[keyName];
		var options = request.body.options;

		var promise = Remove.Delete(modelObj,key,options);

		promise.then(function(result){
			response.send(result);
		})
		.catch(function(error){
			return error;
		})
	});
}


module.exports = DELETE;