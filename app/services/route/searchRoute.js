'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch  = AppPath('/server/dataAccess/fetch');
var q       = require("q");

var SEARCH = function(modelObj){
	return serchMethod(modelObj);
};

var serchMethod = function(modelObj){
	return (function(response,request,modelObj){

		var condition  = req.params[condition];
		var fields     = req.params[fields];
		var options    = req.params[options];
		var modelObj   = new model();

		var promise = Fetch.Fetch(modelObj,condition,fields,options);
		promise.then(function(result){
			return result;
		}).
		catch(function(error){
			return error;
		});
	});
}


module.exports = SEARCH;