'use-strict';

var Q = require("q");

var deleteModel = function(modelObj,key,done){
	
	var deferred = Q.defer();

	var query = modelObj.remove(key);
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
	Delete  : deleteModel
};
