'use-strict';

var rootPath  = require('rfr');
var AppPath   = rootPath('/app/appConfig');
var modelObj  = AppPath('/model/TBLModel');
var Exception = AppPath('/exceptions/baseException').Exception;
var Q = require("q");

var getNextId = function(fieldName){

	var query   = { fieldName  : fieldName };
	var update  = { $inc : { val : 1 } };
	var options = { new : true };

	var deferred = Q.defer();
console.log(query + update + options);
	var query = modelObj.findOneAndUpdate(query,update,options);
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
	GetNextId : getNextId
}

