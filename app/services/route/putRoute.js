'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Put  = AppPath('/server/dataAccess/update');

var PUT = function(model,keyName){
	return putMethod(model,keyName);
}

var putMethod = function(model,keyName){
	return (function(request,response,next){

		var id      = request.params[keyName];
		var options = request.body.options || { new : true };
		var update  = request.body.update;

		var promise = Put.Update(model, id, update, options);

		promise.then(function(result){
			console.log('D : ' + result);
			response.send(result);
		})
		.catch(function(error){
			response.send(error);
		})
	});
}


module.exports = PUT;