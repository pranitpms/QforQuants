'use-strict';

var AppPath           = require('rfr');
var question          = AppPath('/model/questionModel');
var Manager           = AppPath('/server/dataAccess/entityManager');
var Exception         = AppPath('/exceptions/baseException').Exception;
var tableKeyGenerator = AppPath('/server/modelUtility/tableKeyGenerator');

var saveQuestion = function(json){
	var entity = new question(json);

	var promise = tableKeyGenerator.GetNextId(question.PrimaryKey);

	promise.then(function(id){
		entity.userID = id;
		Manager.Save(entity);
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Save');
	})
};

var fetchQuestion = function(condition,fields,options){
	var entity = new question();
	var promise = Manager.Fetch(entity,condition,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Fetch');
	})
};

var fetchQuestionById = function(id,fields,options){
	var entity = new question();
	var promise = Manager.FetchById(entity,id,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'FetchByID');
	})
};


var updateQuestion = function(whereData,setData){
	var entity = new question();

	var promise = Manager.Update(entity,whereData,setData);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Update');
	})
};

var deleteQuestion = function(key){
	var entity = new question();

	var promise = Manager.Delete(entity,key);

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Delete');
	})
};

module.exports = {
	SaveQuestion      : saveQuestion,
	FetchQuestion     : fetchQuestion,
	FetchQuestionById : fetchQuestionById,
	UpdateQuestion    : updateQuestion,
	DeleteQuestion    : deleteQuestion
}

