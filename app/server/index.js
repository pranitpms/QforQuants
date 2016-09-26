'use-strict';

var conUtil        = require('./connectionUtil');
var conn           = require('./connection');
var server         = require('./serverConfiguration').ServerConfig();


conn.CreateConnection(conUtil.ConnectionString(),function(err){

	if(err){
		console.log('Connection failed to server');
		process.exit(1);
	}
	else{
		server.listen(3000,function(){
			console.log('Connection succesfully..!!!\n');
			console.log('listening on port 3000');
		})
	}

});

