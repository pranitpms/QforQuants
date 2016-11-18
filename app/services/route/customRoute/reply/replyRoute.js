'use-strict';

var express  = require('express');
var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var routes   = AppPath('/services/route/customRoute/reply/replyUrls');
var Manager  = AppPath('/services/route/customRoute/reply/replyManager');
var factory  = AppPath('/model/modelFactory');
var app           = AppPath('/server/serverConfiguration');
var _             = require('lodash-node');

var Q  		 = require("q");

var register   = function(){
	var model  = factory.GetModelByName('reply');
	var router = createRouter(model);
	app.use('/reply',router);
};

var createRouter = function(model){

	var router = express.Router();
	router.use(function timelog(req,res,next){
		console.log('Logging for the route: ' + 'reply');
		console.log('Time : ', Date.now());
		next();
	});

	router.get(routes.search,function(request,response,next){
		var condition  = buildCondition(request.query['condition']);
		var fields     = request.query['fields'] || null;
		var options    = request.query['options'] || null;

		var promise = Manager.FetchReply(model,condition,fields,options);
		promise.then(function(result){
			response.send(result);
		}).catch(function(error){
			response.send(error);
		})
	});

	router.post(routes.post,function(request,response,next){

		var modelObj = new model(request.body);

		var promise = Manager.SaveReply(modelObj);

		promise.then(function(result){
			response.send(result);
		})
		.catch(function(error){
			response.send(error);
		})
	});

	router.delete(routes.delete,function(request,response,next){

		var key  = request.params['replyid'];

		var promise = Manager.DeleteReply(model,key);

		promise.then(function(result){
			response.send(result);
		})
		.catch(function(error){
			response.send(error);
		})
	});

	router.put(routes.update,function(request,response,next){

		var id      = request.params['replyid'];
		var options = request.body.options || { new : true };
		var update  = request.body.update;

		var promise = Manager.UpdateReply(model, id, update, options);

		promise.then(function(result){
			response.send(result);
		})
		.catch(function(error){
			response.send(error);
		})
	});

	return router;
}

var buildCondition = function(condition){
	if(!condition) return null;

	var arr = condition.split(",");
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
	Register : register
}