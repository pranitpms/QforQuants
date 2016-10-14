'use-strict';

var Q = require("q");

var save = function(modelObj){

	var deferred = Q.defer();

	modelObj.save()
		.then(function(result){
			deferred.resolve(result);
		})
		.catch(function(error){
			deferred.reject(error);
		});

	return deferred.promise;
};

var insertMany = function(modelObj,jArray){
	var promise = modelObj.insertMany(jArray);

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};

module.exports = {
	Save       : save,
	InsertMany : insertMany
};
