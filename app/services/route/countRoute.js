'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Fetch    = AppPath('/server/dataAccess/fetch');

var COUNT = function(model){
	return getCount(model);
};


var getCount = function(model){
	return (function(request,response,next){
		var condition  = buildCondition(request.query['condition']);
		var promise = Fetch.GetCount(model,condition);

		promise.then(function(result){
			console.log(result);
			response.send('' + result);
		}).catch(function(error){
			console.log(error);
			return error;
		});
	});
};

var buildCondition = function(condition){
	if(!condition) return null;
	
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

module.exports = COUNT;