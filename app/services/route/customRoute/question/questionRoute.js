'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var TextSearch    = AppPath('/server/dataAccess/textsearch');
var _       = require('lodash-node');

var decorate = function(model,router){

	searchTextRoute(model,router);
	searchTextCountRoute(model,router);
};

var searchTextRoute = function(model,router){
    
	var uri = '/textsearch/api/question/:text'
	
	router.get(uri,function(request,response,next){
		
		var text    = request.params['text'];
		var options = buildJson(request.query['options']) || null;

		var promise = TextSearch.Search(model,text,options);
		promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.status(404);
		});
	});
};

var searchTextCountRoute = function(model,router){
    
	var uri = '/textsearchcount/api/question/:text'
	
	router.get(uri,function(request,response,next){
		
		var text    = request.params['text'];

		var promise = TextSearch.SearchCount(model,text);
		promise.then(function(result){
			response.send('' + result);
		}).catch(function(error){
			response.status(404);
		});
	});
};

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

module.exports = {
	Decorate : decorate
};