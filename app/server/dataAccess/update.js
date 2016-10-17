'use-strict'

var update = function(modelObj,whereData,setData){
	var query = modelObj.update(whereData,setData);
	var promise = query.exec();

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		return error;
	});
};

module.exports = {
	Update  : update,
};