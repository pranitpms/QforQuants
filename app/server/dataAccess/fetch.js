'use-strict';

var fetch = function(modelObj,condition,fields,options){
	var query = modelObj.find(condition,fields,options);
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};


var fetchById = function(modelObj,id){
	var query = modelObj.findById(id);
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};

var fetchAll = function(modelObj){
	var query = modelObj.find({});
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
}

module.exports = {
	Fetch     : fetch,
	FetchById : fetchById,
	FetchAll  : fetchAll
}
