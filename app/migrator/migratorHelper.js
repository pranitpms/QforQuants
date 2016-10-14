'use-strict';

var util       = require('util');
var format     = util.format;

var type = null;

var start = function(str){
	return format('%s - %s starts...',str,type);
};

var end  = function(str){
	return format('%s - %s end...',str,type);
};

var error  = function(str){
	return format('%s - %s failed...',str,type);
};

var setType  = function(type){
	type = type;
}; 




module.exports = {
	Start   : start,
	End     : end,
	Error   : error,
	SetType : setType,
	Type    : type
}