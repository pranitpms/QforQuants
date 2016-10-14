'use-strict';

var AppPath           = require('rfr');
var collectionFactory = AppPath('model/collectionFactory');
var routeFactory      = AppPath('routes');

var _collectionName = null;
var _collectionType = null;
var _jsonData       = null;
var _serviceUri     = null;
var Collection     = {};

var CreateCollection = function (){
	return collectionFactory.GetCollection(collectionType);
}

module.exports = {

	Collection : {
		collectionName : this._collectionName,
		collectionType : this._collectionType,
		jsonCollection : this._jsonData;
		serviceUri     : this._serviceUri;
	},

	InitCollection : function (name,type){
		_collectionName = name;
		_collectionType = type;
		_jsonData       = this.CreateCollection();
		_serviceUri     = routeFactory.RouteUrl(name);
	}

}