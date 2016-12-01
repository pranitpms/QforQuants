'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var TextSearch    = AppPath('/server/dataAccess/textSearch');
var _       = require('lodash-node');
var routes  = AppPath('/services/routes');
var manager = AppPath('/object/questionManager');

var decorate = function(model,router){
	
	modifiedGetRoutes(model,router);
	searchTextRoute(model,router);
	searchTextCountRoute(model,router);
};

var modifiedGetRoutes = function(model,router){
	router.stack.splice(1, 4);


	var uri = routes.RouteUrl('question').getAll;
	router.get(uri,function(request,response,next){
	
	var promise = manager.FetchAll(model);
	promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.send(error);
		});
	});



	 uri = routes.RouteUrl('question').get;
	router.get(uri,function(request,response,next){
		var key  = request.params['questionid'];

		var promise = manager.FetchById(model,key,'questionId');

		promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.send(error);
		});
	});

	
	 uri = routes.RouteUrl('question').search;
	router.get(uri,function(request,response,next){
		var condition  = buildJson(request.query['condition']);
		var fields     = request.query['fields'] || null;
		var options    = buildJson(request.query['options']) || null;

		var promise = manager.FetchQuestions(model,condition,fields,options);
		promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.send(error);
		});
	});

	uri = routes.RouteUrl('question').post;
	router.post(uri,function(request,response,next){

		var modelObj = new model(request.body);

		var promise = manager.SaveQuery(modelObj);

		promise.then(function(result){
			response.send(result);
		})
		.catch(function(error){
			response.send(error);
		})
	});
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