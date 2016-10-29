'use-strict'

var Q = require("q");

var update = function(modelObj,whereData,setData){
	var deferred = Q.defer();

	var query = modelObj.update(whereData,setData);
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