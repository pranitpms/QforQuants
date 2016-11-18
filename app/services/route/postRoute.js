'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var entity  = AppPath('/server/dataAccess/entityManager');

var POST = function(model){
	return postMethod(model);
};

var postMethod = function(model){
	return (function(request,response,next){

		var modelObj = new model(request.body);

		var promise = entity.Save(modelObj);

		promise.then(function(result){
			response.send(result);
			console.log(result)
		})
		.catch(function(error){
			response.send(error);
		})
	});
};
module.exports = POST;