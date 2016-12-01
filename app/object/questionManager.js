'use-strict';

var Q = require("q");

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var routes  = AppPath('/services/routes');
var _       = require('lodash-node');
var factory  = AppPath('/model/modelFactory');
var insert   = AppPath('/server/dataAccess/insert');
var tableKeyGenerator = AppPath('/server/modelUtility/tableKyeGenerator');

var fetchQuestions = function(modelObj,condition,fields,options){

	var deferred = Q.defer();
	var query = modelObj.find(condition).populate('_user');

	if(fields){
		var result = '\'' + fields.split(',').join('\',\'') + '\'';
		query = query.select(result);
	}
	
	if(options){
		if(options.limit){
			 query = query.limit(parseInt(options.limit));
		}
		if(options.skip){
			 query = query.skip(parseInt(options.skip));
		}
		if(options.sort){
			query =  query.sort(options.sort);
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

var fetchAllQuestions = function(modelObj){

	var deferred = Q.defer();

	var query = modelObj.find().populate('_user');
	var promise = query.exec();

	promise.then(function(result){
		deferred.resolve(result);
	})
	.catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};

var fetchById = function(modelObj,id,keyName){
	var deferred = Q.defer();

	var condition = {};
	condition[keyName] = id;

	console.log(condition);
	var query = modelObj.findOne(condition).populate('_user');
	var promise = query.exec();

	promise.then(function(result){
		deferred.resolve(result);
	})
	.catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};


var saveQuery = function(modelObj){

	var deferred = Q.defer();
	var primaryKey = modelObj.PrimaryKey;

	var promise = tableKeyGenerator.GetNextId(primaryKey);

	promise.then(function(key){
		modelObj[primaryKey] = key.val;
		return insert.Save(modelObj);
	}).then(function(newResult){
		deferred.resolve(newResult);
	}).catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};

module.exports = {
	FetchQuestions    : fetchQuestions,
	FetchAllQuestions : fetchAllQuestions,
	FetchById         : fetchById,
	SaveQuery         : saveQuery
}
