'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var Exception    = AppPath('/exceptions/baseException').Exception;
var mongoose     = require('mongoose');
mongoose.Promise = require('q').Promise;

var opts = { 
	server: { 
		auto_reconnect: true 
	} 
};

var command = null;


var createConnection = function(connectionString){
	command = mongoose.connect(connectionString,opts);
	return command;
};

var open = function(){
	if(command){
		command.open();
		return true;
	}
	else{
		var error = new Error('Connection is not created');
		throw Exception(0,'connection',error,'-1000');
	}
};

var close = function(){
	if(command){
		command.close();
		return true;
	}
	else{
		var error = new Error('Connection is not created');
		throw Exception(0,'connection',error,'-1000');
	}
};

var setCommand = function(db){
	command = db;
}

var getCommand =  function(){
	return command
}

module.exports = {
	CreateConnection : createConnection,
	Open             : open,
	Close            : close,
	SetCommand       : setCommand,
	GetCommand       : getCommand
}