'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Insert  = AppPath('/server/dataAccess/insert');

var POST = function(model){

	return postMethod(model);
}

var postMethod = function(model){
	return (function(response,request,model){

		var modelObj = new model(request.body);

		var promise = Insert.Save(modelObj);

		promise.then(function(result){
			return result;
		})
		.catch(function(error){
			return error;
		})
	});
}
module.exports = POST;