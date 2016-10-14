'use-strict';

var util       = require('util');
var format     = util.format;

var dbException = function(type,error) {
		this.type      = type;
        this.code      = '-8000';
        this.exception  = error.message;
		this.stack      = error.stack; 
		this.errorType  = error.type;
};

module.exports = {
	DBException : dbException
}