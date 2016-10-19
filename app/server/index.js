'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var conUtil  = AppPath('/server/connectionUtil');
var conn     = AppPath('/server/connection');
var server   = AppPath('/server/serverConfiguration');
var up       = AppPath('/migrator/up/order');
var down     = AppPath('/migrator/down/order');
var API      = AppPath('/services/apiController');

var util     = require('util');
var format   = util.format;

var connectionString = conUtil.ConnectionString;

var connection = conn.CreateConnection(connectionString);

if(connection){

//up.Executes(); // run migrator.
 //initialize configuration.
API.InitRouteConfig();
server.listen(5000,function(){
	console.log('Server Connection succesfully..!!!\n');
	console.log('listening on port 5000');
});

}

process.on('uncaughtException', (err) => {
	var msg;
	switch(err.errorCode){
		case '-1000' : msg = format('Migration Failed Script - %s.js ;', err.scriptName);
					   break;
		case '-2000' : msg = format('Application Error File - %s.js  ; ', err.type);
					   break;
	    case '-8000' : msg = format('DataBase Error File    - %s.js  ; ', err.type);
	   				   break;
	}


	console.log('\nExceptin in File : ' + msg);
	console.log('\nException Type   : ' + err.errorType);
	console.log('\nException Name   : ' + err.exception);
	console.log('\nStack- Trace    : '  + err.stack);
	console.log('.');
	console.log('.');
	console.log('\nexiting from the process !!!!')
    process.exit(1);
});

