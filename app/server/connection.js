'use-strict';

var mongodb        = require('mongodb');
var client = mongodb.MongoClient;


var Command = null;

module.exports = {
	ConnectToClient : function (url,done){
		
		client.connect(url, function(err, db) {
	    	if (err){
	     		return done(err);
	 		}
	    	this.Command = db;
	    	done();
	  	})
	},

	CreateConnection : function (url,done){
		if(this.Command){
			return done();
		}
		this.ConnectToClient(url,done);
	},

	GetConnection : function (){
		return this.Command;
	},

	Close : function (done){
		if(this.Command){
			this.Command.close(function(err,result){
				this.Command = null;
				done(err);
			});
		}
	}
};

 