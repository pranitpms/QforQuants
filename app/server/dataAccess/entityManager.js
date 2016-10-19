'use-strict';

var rootPath = require('rfr');
var AppPath  = rootPath('/app/appConfig');
var insert   = AppPath('/server/dataAccess/insert');
var remove   = AppPath('/server/dataAccess/delete');
var fetch    = AppPath('/server/dataAccess/fetch');
var update   = AppPath('/server/dataAccess/update');

module.exports = {
	Save       : insert.Save,
	InsertMany : insert.InsertMany,
	Update     : update.Update,
	Delete     : remove.Delete,
	Fetch      : fetch.Fetch,
	FetchById  : fetch.FetchById
}