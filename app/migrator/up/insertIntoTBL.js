'use-strict';

var AppPath      = require('rfr');
var insert       = AppPath('/server/dataAccess/insert');
var modelFactory = AppPath('/model/modelFactory');
var helper       = AppPath('/migrator/migratorHelper');
var Exception    = AppPath('/exceptions/baseException').Exception;
var _            = require('lodash-node');
var tblModel     = AppPath('/model/TBLModel');
var userModel     = AppPath('/model/userModel');

 var mongoose     = require('mongoose');
// mongoose.Promise = require('bluebird');

helper.SetType('upgrade');
var tblID = 1;


var insertIntoTBL = function(){
var models = modelFactory.GetAllModels();

	// _.forEach(models,function(model){

	// 	// var modelObj =  new model();
	// 	// var data = createJson(modelObj,tblID);
	// 	// var tbl = new tblModel(data);

	// 	// //var promise = insert.Save(tbl);
	// 	// var deferred = Q.defer();

	// 	// tbl.save()
	// 	// 	.then(function(result){
	// 	// 		deferred.resolve(result);
	// 	// 	})
	// 	// 	.catch(function(error){
	// 	// 		deferred.reject(error);
	// 	// 	});

	// 	// //return ;

	// 	//  the_promises.push(deferred.promise);
	// })

	// console.log(the_promises);
	// return Q.all(the_promises);
	
	console.log('mongoose.connection : ' + mongoose.connection);
console.log(mongoose.model);

	var modelObj =  mongoose.model('Users');
	var data = createJson(modelObj,5);
	var tbl = new tblModel(data);
	 
	 console.log(data);



	tbl.save(function(err,result,number){
		if(err){
			console.log(err);
		}
		console.log('result : ' + result);
		console.log('number : ' + number);
	})

	helper.End('Migration Completed');
};

var createJson = function(modelObj,id){
	var json = {
		tblID          : id,
		collectionName : modelObj.CollectionName,
		fieldName      : modelObj.PrimaryKey,
		val            : 0,
		LastValue      : 99999
	};
	return json;
}

module.exports = {
	InsertIntoTBL : insertIntoTBL
}
