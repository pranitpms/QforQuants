'use-strict'

var Q = require("q");

var update = function(modelObj,id, update, options){
	var deferred = Q.defer();

	var query = modelObj.findByIdAndUpdate(id, update, options);
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
	Update  : update,
};