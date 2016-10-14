'use-strict';

var util       = require('util');
var format     = util.format;

var userException = function(type,error,code) {
		this.errorCode  = code;
		this.type       = type;
		this.exception  = error.message;
		this.stack      = error.stack; 
		this.errorType  = error.type;
};

module.exports = {
	UserException : userException
}