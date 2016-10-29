'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var entity  = AppPath('/server/dataAccess/entityManager');

var POST = function(model,primaryKey){
	return postMethod(model,primaryKey);
};

var postMethod = function(model,primaryKey){
	return (function(request,response,next){

		var modelObj = new model(request.body);

		var promise = entity.Save(modelObj,primaryKey);

		promise.then(function(result){
			response.send(result);
			console.log(result)
		})
		.catch(function(error){
			return error;
		})
	});
};
module.exports = POST;