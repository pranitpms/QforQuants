'use-strict';

var Q = require("q");

var deleteModel = function(modelObj,id, options){
	
	var deferred = Q.defer();
console.log('id : ' + id);
	var query = modelObj.findByIdAndRemove(id);
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
