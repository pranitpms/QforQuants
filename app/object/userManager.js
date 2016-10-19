'use-strict';

var rootPath          = require('rfr');
var AppPath           = rootPath('/app/appConfig');
var user              = AppPath('/model/userModel');
var Manager           = AppPath('/server/dataAccess/entityManager');
var Exception         = AppPath('/exceptions/baseException').Exception;
var tableKeyGenerator = AppPath('/server/modelUtility/tableKeyGenerator');

var saveUser = function(json){
	var entity = new user(json);

	var promise = tableKeyGenerator.GetNextId(user.PrimaryKey);

	promise.then(function(id){
		entity.userID = id;
		Manager.Save(entity);
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Save');
	})
};

var fetchUser = function(condition,fields,options){
	var entity = new user();
	var promise = Manager.Fetch(entity,condition,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Fetch');
	})
};

var fetchUserById = function(id,fields,options){
	var entity = new user();
	var promise = Manager.FetchById(entity,id,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'FetchByID');
	})
};


var updateUser = function(whereData,setData){
	var entity = new user();

	var promise = Manager.Update(entity,whereData,setData);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Update');
	})
};

var deleteUser = function(key){
	var entity = new user();

	var promise = Manager.Delete(entity,key);

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		throw Exception(2,'userManager',error,null,'Delete');
	})
};

module.exports = {
	SaveUser      : saveUser,
	FetchUser     : fetchUser,
	FetchUserById : fetchUserById,
	UpdateUser    : updateUser,
	DeleteUser    : deleteUser
}

