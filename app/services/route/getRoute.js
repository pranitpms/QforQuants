'use-strict';

var AppPath = require('rfr');
var Fetch  = AppPath('/server/dataAccess/fetch');

var GET = function(response,request,model,keyName){

	var key  = req.params[keyName];
	var modelObj = new model();

	var promise = Fetch.FetchById(modelObj,key);
	promise.then(function(result){
		return result;
	}).
	catch(function(error){
		return error;
	});
};


module.exports = GET;