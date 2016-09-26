'use-strict';

var _     = require('lodash-node');

var addSetValue = function(setJson){
	var set = {
		$set         : {setJson},
		$currentDate : { "lastModified": true }
	};

	return set;
};

var addSetValueWithoutLastModified = function(setJson){
	var set = {
		$set  : {setJson}
	};

	return set;
};

module.exports = {
	AddSetValue                    : this.addSetValue,
	AddSetValueWithoutLastModified : this.addSetValueWithoutLastModified
};
