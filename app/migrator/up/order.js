
var rootPath    = require('rfr');
var AppPath     = rootPath('/app/appConfig');
var first       = AppPath('/migrator/up/insertIntoTBL');

module.exports = {

	Executes : function(){
		first.InsertIntoTBL();
	}
}