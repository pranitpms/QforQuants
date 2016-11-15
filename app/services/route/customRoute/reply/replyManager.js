'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var insert   = AppPath('/server/dataAccess/insert');
var tableKeyGenerator = AppPath('/server/modelUtility/tableKyeGenerator');
var factory  = AppPath('/model/modelFactory');
var Q  		 = require("q");

var saveReply = function(modelObj){
	var primaryKey = modelObj.PrimaryKey;

	var promise = tableKeyGenerator.GetNextId(primaryKey);

	var deferred = Q.defer();

	promise.then(function(result){
		
		modelObj[primaryKey] = result.val;
		return insert.Save(modelObj);
	}).then(function(reply){
		return fetchByID(reply._id,null);
	}).then(function(newResult){
		deferred.resolve(newResult);
	}).catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};

var fetchByID = function(id,model){

	if(!model){
		model  = factory.GetModelByName('reply');
	}
	var deferred = Q.defer();

	var query = model.findById(id).populate('_user');
	var promise = query.exec();

	promise.then(function(result){
		deferred.resolve(result);
	})
	.catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
}

var fetchReply = function(modelObj,condition,fields,options){

	var deferred = Q.defer();
console.log('condition : ' + condition);
	var query = modelObj.find(condition,fields,options).populate('_user');
	var promise = query.exec();

	promise.then(function(result){
		console.log('\n reply ' + result);
		deferred.resolve(result);
	})
	.catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};

var deleteReply = function(modelObj,id){
	
	var deferred = Q.defer();

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

var updateReply = function(modelObj,id, update, options){
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
	SaveReply   : saveReply,
	FetchReply  : fetchReply,
	DeleteReply : deleteReply,
	UpdateReply : updateReply
}

