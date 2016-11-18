'use-strict';

var Q = require("q");

var search = function(modelObj,text,options){
	var deferred = Q.defer();

	var query = modelObj.find(
		{ $text : { $search : text } },
		{ score : { $meta: "textScore" } }
	).sort({ score: { $meta : "textScore" } });

	if(options){
		if(options.limit){
			 query = query.limit(parseInt(options.limit));
		}
		if(options.skip){
			 query = query.skip(parseInt(options.skip));
		}
	}

	var promise = query.exec();

	promise.then(function(result){
		deferred.resolve(result);
	})
	.catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};

var searchCount = function(modelObj,text){

	var deferred = Q.defer();

	var query = modelObj.count(
		{ $text : { $search : text } }
	);
	var promise = query.exec();

	promise.then(function(result){
		deferred.resolve(result);
	})
	.catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};


module.exports = {
	Search : search,
	SearchCount : searchCount
};
