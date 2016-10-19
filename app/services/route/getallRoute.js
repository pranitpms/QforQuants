'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch  = AppPath('/server/dataAccess/fetch');
var q       = require("q");


var GETALL = function(model){
	return getMethod(model);
};


var getMethod = function(model){
	return (function(response,request,model){
		var modelObj = new model();

		var promise = Fetch.FetchAll(modelObj);
		promise.then(function(result){
			return result;
		}).
		catch(function(error){
			return error;
		});
	});
}

module.exports = GETALL;