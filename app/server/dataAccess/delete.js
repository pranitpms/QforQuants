'use-strict';

var deleteModel = function(modelObj,key,done){
	var query = modelObj.remove(key);
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};

module.exports = {
	Delete  : deleteModel
};
