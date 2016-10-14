'use-strict';

var util       = require('util');
var format     = util.format;

var migrationException = function(name,error,code) {
		this.scriptName = name;
		this.errorCode  = code; 
		this.exception  = error.message;
		this.stack      = error.stack; 
		this.errorType  = error.name;
};

module.exports = {
	MigrationException : migrationException
}


