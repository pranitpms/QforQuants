'use-strict';

var AppPath       = require('rfr');
var userModel     = AppPath('/model/userModel');
var roleModel     = AppPath('/model/userRoleModel');
var questionModel = AppPath('/model/questionModel');
var replyModel    = AppPath('/model/replyModel');
var categoryModel = AppPath('/model/categoryModel');
var tblModel      = AppPath('/model/TBLModel');
var modles        = AppPath('/model/modelEnum');


var getModel = function(modelType){
		switch(modelType){
			case modles.users    : return userModel;
			case modles.role     : return roleModel;
			case modles.question : return questionModel;
			case modles.category : return categoryModel;
			case modles.reply    : return replyModel;
			case modles.TBL      : return tblModel;
		};
	};

var	getModelByName = function(modelName){
		switch(modelName){
			case 'users'    : return userModel;
			case 'userRole' : return roleModel;
			case 'question' : return questionModel;
			case 'category' : return categoryModel;
			case 'reply'    : return replyModel;
			case 'TBL'      : return tblModel;
		}
	};

var getAllModels = function(){
	var models = [
		userModel,
		roleModel,
		questionModel,
		categoryModel,
		replyModel,
	];
	return models;
}

module.exports = {
	GetModel       : getModel,
	GetModelByName : getModelByName,
	GetAllModels   : getAllModels
}