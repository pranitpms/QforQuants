'use-strict';

var express = require('express');
var service = require('./service');
var router = express.Router();

var serviceUri = null;

router.use(function timelog(req,res,next){

	console.log('Time : ', Date.now());
	next();
})

router.get(serviceUri.getAll,function(req,res){
	
});

module.exports = {
	 router,

	 SetServiceUri : function(uri){
	 	this.serviceUri = uri;

	 }
}