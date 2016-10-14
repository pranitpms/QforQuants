'use-strict';

var util       = require('util');
var format     = util.format;

var entityException = function(type,error,operation) {
		this.type      = type;
        this.code      = '-8000';
        this.operation = operation;
        this.exception  = error.message;
		this.stack      = error.stack; 
		this.errorType  = error.type;
};

module.exports = {
	EntityException : entityException
}