'use-strict';

var express    = require('express');
var service    = require('./service');
var connection = require('./connection');
var proxy      = require('./index');

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

router.post(serviceUri.post,function(res,req){
	var json  = req.body.json;
	
});