'use-strict';

var AppPath   = require('rfr');
var modelObj  = AppPath('/model/TBLModel');
var Exception = AppPath('/exceptions/baseException').Exception;

var cmd = null; 

var getNextId = function(fieldName,done){

	var query   = { fieldName  : fieldName };
	var update  = { $inc : { val : 1 } };
	var options = { new : true };


	var query = modelObj.findOneAndUpdate(query,update,options);

	var promise = query.exec();

	promise.then(function(result){
		return result.val;
	})
	.catch(function(error){
		throw Exception(1,'tableKeyGenerator',error,null);
	})
	
}

module.exports = {
	GetNextId : getNextId
}

