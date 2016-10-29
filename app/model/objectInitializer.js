'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var factory  = AppPath('/model/modelFactory');

var initializeObject = function(modelName,json){

	if(json){
		return createInstacne(modelName,json);
	}
	else{
		return createInstacne(modelName);
	}
};

var createInstacne = function(modelName,json){
	var model = factory.GetModelByName(modelName);
	return new model(json);
};

var createInstacne = function(modelName){
	var model = factory.GetModelByName(modelName);
	return new model();
};


module.exports = {
	InitializeObject : initializeObject
}