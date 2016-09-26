'use-strict';

var _     = require('lodash-node');

var key   = null;
var value = null;
var json = {}; ;

var addValue = function(key,value){
	if(!hasKey(key)){
		_.merge(where,{key,value});
	}
};

var changeValue = function(key,value){
	_.set(where,key,value);
};

var removeValue = function(key){
	return _.unset(where,key);
};

var hasKey = function(key){

	_.findKey(where, function(o){
		return o.key === key;
	});
};

module.exports = {
	AddValue    : this.addValue,
	ChangeValue : this.changeValue,
	RemoveValue : this.removeValue,
	HasKey      : this.hasKey,
	Json        : this.json
};