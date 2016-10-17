'use-strict';

var AppPath = require('rfr');
var Insert  = AppPath('/server/dataAccess/insert');

var POST = function(response,request,model){

	var modelObj = new model(request.body);

	var promise = Insert.Save(modelObj);

	promise.then(function(result)){
		return result;
	})
	.catch(function(error){
		return error;
	})
}


module.exports = POST;