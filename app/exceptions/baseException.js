'use-strict';

var rootPath           = require('rfr');
var AppPath            = rootPath('/app/appConfig');
var dbExceptions       = AppPath('/exceptions/dbExceptions').DBException;
var userException      = AppPath('/exceptions/userException').UserException;
var entityException    = AppPath('/exceptions/entityException').EntityException;
var exceptionType      = AppPath('/exceptions/exceptionEnum').Exceptions;
var migratorException  = AppPath('/exceptions/migratorException').MigrationException;

module.exports = {

	Exception : function(type,file,error,code,operation){
		switch(type){
			case exceptionType.userException     : return new userException(file,error,code); 
			case exceptionType.dbException       : return new dbExceptions(file,error);
			case exceptionType.entityException   : return new dbExceptions(file,error,code,operation);
			case exceptionType.migratorException : return new migratorException(file,error,code);
		}
	}
}