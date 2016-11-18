'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch  = AppPath('/server/dataAccess/fetch');
//ar q       = require("q");
//var mongoose = require('mongoose');


var GETALL = function(model){
	return getMethod(model);
};


var getMethod = function(model){
	return (function(request,response,next){
		
		var promise = Fetch.FetchAll(model);
		promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.send(error);
		});
	});
}

module.exports = GETALL;