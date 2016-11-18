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
		var condition  = buildJson(request.query['condition']);
		var fields     = request.query['fields'] || null;
		var options    = buildJson(request.query['options']) || null;

		var promise = Fetch.Fetch(modelObj,condition,fields,options);
		promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.send(error);
		});
	});
}


var buildJson = function(param){
	if(!param) return null;

	var arr = param.split(",");
	var c = {};
	_.forEach(arr,function(token){
		var  pair = token.split(":");
		var key   = pair[0].trim();
		var value = pair[1].trim();
		c[key]    = value;
	})

	return c;
};

module.exports = SEARCH;