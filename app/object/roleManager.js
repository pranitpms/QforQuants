'use-strict';

var rootPath          = require('rfr');
var AppPath           = rootPath('/app/appConfig');
var role              = AppPath('/model/userRoleModel');
var Manager           = AppPath('/server/dataAccess/entityManager');
var Exception         = AppPath('/exceptions/baseException').Exception;
var tableKeyGenerator = AppPath('/server/modelUtility/tableKyeGenerator');

var saveRole = function(json){
	var entity = new role(json);

	var promise = tableKeyGenerator.GetNextId(role.PrimaryKey);

	promise.then(function(id){
		entity.userID = id;
		Manager.Save(entity);
	})
	.catch(function(error){
		throw Exception(2,'roleManager',error,null,'Save');
	})
};

var fetchRole = function(condition,fields,options){
	var entity = new role();
	var promise = Manager.Fetch(entity,condition,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'roleManager',error,null,'Fetch');
	})
};

var fetchRoleById = function(id,fields,options){
	var entity = new role();
	var promise = Manager.FetchById(entity,id,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'roleManager',error,null,'FetchByID');
	})
};


var updateRole = function(whereData,setData){
	var entity = new role();

	var promise = Manager.Update(entity,whereData,setData);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'roleManager',error,null,'Update');
	})
};

var deleteRole = function(key){
	var entity = new role();

	var promise = Manager.Delete(entity,key);

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		throw Exception(2,'roleManager',error,null,'Delete');
	})
};

module.exports = {
	SaveRole      : saveRole,
	FetchRole     : fetchRole,
	FetchRoleById : fetchRoleById,
	UpdateRole    : updateRole,
	DeleteRole    : deleteRole
}

