'use-strict';

var AppPath = require('rfr');
var Put  = AppPath('/server/dataAccess/update');

var PUT = function(response,request,model){

	var whereData = req.body.where;
	var setData   = req.body.set;

	var modelObj = new model(request.body);

	var promise = Put.Update(modelObj,whereData,setData);

	promise.then(function(result)){
		return result;
	})
	.catch(function(error){
		return error;
	})
}


module.exports = PUT;