'use-strict';

var AppPath = require('rfr');
var Remove  = AppPath('/server/dataAccess/delete');

var DELETE = function(model){

	return DeleteMethod(model);
}

var DeleteMethod = function(model){
	return (function(response,request,model){

		var key  = req.params[keyName];
		var modelObj = new model();

		var promise = Remove.Delete(modelObj,key);

		promise.then(function(result){
			return result;
		})
		.catch(function(error){
			return error;
		})
	});
}


module.exports = DELETE;