'use-strict';

var AppPath           = require('rfr');
var category          = AppPath('/model/categoryModel');
var Manager           = AppPath('/server/dataAccess/entityManager');
var Exception         = AppPath('/exceptions/baseException').Exception;
var tableKeyGenerator = AppPath('/server/modelUtility/tableKeyGenerator');

var saveCategory = function(json){
	var entity = new category(json);
	var promise = tableKeyGenerator.GetNextId(category.PrimaryKey);

	promise.then(function(id){
		entity.userID = id;
		Manager.Save(entity);
	})
	.catch(function(error){
		throw Exception(2,'categoryManager',error,null,'Save');
	})
};

var fetchCategory = function(condition,fields,options){
	var entity = new category();
	var promise = Manager.Fetch(entity,condition,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'categoryManager',error,null,'Fetch');
	})
};

var fetchCategoryById = function(id,fields,options){
	var entity = new category();
	var promise = Manager.FetchById(entity,id,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'categoryManager',error,null,'FetchByID');
	})
};


var updateCategory = function(whereData,setData){
	var entity = new category();
	var promise = Manager.Update(entity,whereData,setData);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'categoryManager',error,null,'Update');
	})
};

var deleteCategory = function(key){
	var entity = new category();
	var promise = Manager.Delete(entity,key);

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		throw Exception(2,'categoryManager',error,null,'Delete');
	})
};

module.exports = {
	SaveCategory      : saveCategory,
	FetchCategory     : fetchCategory,
	FetchCategoryById : fetchCategoryById,
	UpdateCategory    : updateCategory,
	DeleteCategory    : deleteCategory
}

