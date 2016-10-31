'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch    = AppPath('/server/dataAccess/fetch');
var q        = require("q");
var _       = require('lodash-node');

var SEARCH = function(modelObj){
	return serchMethod(modelObj);
};

var serchMethod = function(modelObj){
	return (function(request,response,next){
		var condition  = buildCondition(request.query['condition']);
		var fields     = request.query['fields'] || null;
		var options    = request.query['options'] || null;

		var promise = Fetch.Fetch(modelObj,condition,fields,options);
		promise.then(function(result){
			response.send(result);
			return result;
		}).catch(function(error){
			return error;
		});
	});
}


var buildCondition = function(condition){
	var arr = condition.split(",");
	var c = {};
	_.forEach(arr,function(token){
		var  pair = token.split(":");
		var key   = pair[0];
		var value = pair[1];
		c[key]    = value;
	})

	return c;
}

module.exports = SEARCH;