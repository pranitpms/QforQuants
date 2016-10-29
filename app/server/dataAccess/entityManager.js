'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var insert   = AppPath('/server/dataAccess/insert');
var remove   = AppPath('/server/dataAccess/delete');
var fetch    = AppPath('/server/dataAccess/fetch');
var update   = AppPath('/server/dataAccess/update');
var tableKeyGenerator = AppPath('/server/modelUtility/tableKyeGenerator');
var Q = require("q");


var save = function(modelObj,primaryKey){

	var promise = tableKeyGenerator.GetNextId(primaryKey);

	var deferred = Q.defer();

	promise.then(function(result){
		console.log('val : ' + result.val);
		console.log(modelObj);
		modelObj[primaryKey] = result.val;

		insert.Save(modelObj).then(function(result){
			deferred.resolve(result);
		});
	}).catch(function(error){
		deferred.reject(error);
	});

	return deferred.promise;
};

module.exports = {
	Save       : save,
	InsertMany : insert.InsertMany,
	Update     : update.Update,
	Delete     : remove.Delete,
	Fetch      : fetch.Fetch,
	FetchById  : fetch.FetchById
}