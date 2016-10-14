'use-strict';

var AppPath    = require('rfr');
var express    = require('express');
var service    = AppPath('/services/service');
var connection = AppPath('/server/connection');
var proxy      = AppPath('/server/index');

var name = null;
var type = null;

service.InitCollection(name,type);

var AppCollection = service.Collection;
var serviceUri = service.Collection.serviceUri;


var Command = connection.GetConnection();

if(!Command){
	connection.CreateConnection();
	Command = connection.GetConnection();
}

var router  = express.Router();
router.use(function timelog(req,res,next){

	console.log('Time : ', Date.now());
	next();
})

router.get(serviceUri.getAll,function(req,res){
	var dataset = Command.get().collection(AppCollection.collectionName);
	res.send(dataset);
});

router.get(serviceUri.get,function(req,res){
	var dataset = Command.get().collection(AppCollection.collectionName);
	res.send(dataset);
});

router.post(serviceUri.post,function(res,req){
	var json  = req.body.json;
	res.end('repsonse object',json);
});

router.put(serviceUri.put,function(res,req){
	var json = req.body.json;
	res.end('response object',json);
});

router.delete(serviceUri.delete,function(res,req){
	var 
});