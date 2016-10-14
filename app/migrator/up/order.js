
var AppPath  = require('rfr');

var first    = AppPath('/migrator/up/insertintoTBL');

module.exports = {

	Executes : function(){
		first.InsertIntoTBL();
	}
}