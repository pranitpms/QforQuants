'use-strict';

var fetch = function(modelObj,condition,fields,options,done){
	var query = modelObj.find(condition,fields,options);
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};


var fetchById = function(modelObj,id,fields,options,done){
	var query = modelObj.findById(condition,fields,options);
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};

module.exports = {
	Fetch     : fetch,
	FetchById : fetchById
}
