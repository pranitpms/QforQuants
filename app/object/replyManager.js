'use-strict';

var rootPath          = require('rfr');
var AppPath           = rootPath('/app/appConfig');
var reply              = AppPath('/model/replyModel');
var Manager           = AppPath('/server/dataAccess/entityManager');
var Exception         = AppPath('/exceptions/baseException').Exception;
var tableKeyGenerator = AppPath('/server/modelUtility/tableKeyGenerator');

var saveReply = function(json){
	var entity = new reply(json);

	var promise = tableKeyGenerator.GetNextId(reply.PrimaryKey);

	promise.then(function(id){
		entity.userID = id;
		Manager.Save(entity);
	})
	.catch(function(error){
		throw Exception(2,'replyManager',error,null,'Save');
	})
};

var fetchReply = function(condition,fields,options){
	var entity = new reply();
	var promise = Manager.Fetch(entity,condition,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'replyManager',error,null,'Fetch');
	})
};

var fetchReplyById = function(id,fields,options){
	var entity = new reply();
	var promise = Manager.FetchById(entity,id,fields,options);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'replyManager',error,null,'FetchByID');
	})
};


var updateReply = function(whereData,setData){
	var entity = new reply();

	var promise = Manager.Update(entity,whereData,setData);

	promise.then(function(entityJson){
		return entityJson;
	})
	.catch(function(error){
		throw Exception(2,'replyManager',error,null,'Update');
	})
};

var deleteReply = function(key){
	var entity = new reply();

	var promise = Manager.Delete(entity,key);

	promise.then(function(result){
		return result;
	})
	.catch(function(error){
		throw Exception(2,'replyManager',error,null,'Delete');
	})
};

module.exports = {
	SaveReply      : saveReply,
	FetchReply     : fetchReply,
	FetchReplyById : fetchReplyById,
	UpdateReply    : updateReply,
	DeleteReply    : deleteReply
}

