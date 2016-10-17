'use-strict';

var AppPath = require('rfr');
var Fetch  = AppPath('/server/dataAccess/fetch');
var q       = require("q");


var GETALL = function(response,request,model){
	var modelObj = new model();

	var promise = Fetch.FetchAll(modelObj);
	promise.then(function(result){
		return result;
	}).
	catch(function(error){
		return error;
	});
};


module.exports = GETALL;