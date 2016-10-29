'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch    = AppPath('/server/dataAccess/fetch');
var q        = require("q");

var SEARCH = function(modelObj){
	return serchMethod(modelObj);
};

var serchMethod = function(modelObj){
	return (function(request,response,next){
		var condition  = request.query['condition'];
		var fields     = request.query['fields'];
		var options    = request.query['options'];

		var promise = Fetch.Fetch(modelObj,condition,fields,options);
		promise.then(function(result){
			response.send(result);
			return result;
		}).catch(function(error){
			return error;
		});
	});
}


module.exports = SEARCH;