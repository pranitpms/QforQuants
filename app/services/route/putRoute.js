'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Put  = AppPath('/server/dataAccess/update');

var PUT = function(model){
	return putMethod(model);
}

var putMethod = function(model){
	return (function(request,response,next){

		var whereData = request.body.where;
		var setData   = request.body.set;

		var modelObj = new model(request.body);

		var promise = Put.Update(modelObj,whereData,setData);

		promise.then(function(result){
			response.send(result);
		})
		.catch(function(error){
			return error;
		})
	});
}


module.exports = PUT;