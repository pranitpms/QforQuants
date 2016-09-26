'use-strict';

var util    = require('util');

var user          = encodeURIComponent('pranitpms');
var password      = encodeURIComponent('Quants321');
var authMechanism = 'DEFAULT';
var authSource    = 'Quants';

var format = util.format;
var url = format('mongodb://%s:%s@localhost:27017/Quants',user,password);

var _connectionString = null;

//connect the database 
module.exports = {

	ConnectionString : function(){
		if(_connectionString == null){
			_connectionString = url;
		}
		return _connectionString;
	}

};


// client.connect(url,function(err,db){
// 	assert.equal(null, err);
// 	console.log("Connected correctly to server");
// 	db.close();
// });