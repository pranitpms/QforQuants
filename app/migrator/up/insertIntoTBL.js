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
mongoose.Promise = require('bluebird');

var Q = require("q");

helper.SetType('upgrade');
var tblID = 1;


var insertIntoTBL = function(){
var models = modelFactory.GetAllModels();
	 var the_promises = [];
	_.forEach(models,function(model){

		var modelObj =  new model();
		var data = createJson(modelObj,tblID);
		var tbl = new tblModel(data);

		var promise = insert.Save(tbl);
        the_promises.push(promise);
        tblID ++;
	})

	console.log(the_promises);
	var d = Q.all(the_promises);
	console.log(d);
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
