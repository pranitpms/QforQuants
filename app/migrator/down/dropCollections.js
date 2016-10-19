'use-strict';

var rootPath    = require('rfr');
var AppPath     = rootPath('/app/appConfig');
var collections = AppPath('migrator/collectionList');
var command     = AppPath('/server/command');
var _           = AppPath('lodash-node');

var cmd =null;

var dropCollections = function(){
	cmd = command.CreateCommand();
	_.forEach(collections,function(col){
		try{
			command.GetCollection(cmd,col.CollectionName,col);
			coll.drop();
		}
		catch(error){
			console.log(error);
		}
		finally{
			if(!_.isNil(cmd)){
			cmd.Close();
		}
		}

	});
};

module.exports ={
	DropCollections : dropCollections
}