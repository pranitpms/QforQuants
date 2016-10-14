'use-strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userRoleSchema = new Schema({
	roleId   : { type: Number, required: true, unique: true , index: true},
	roleName : String
},
{ strict: false });


userRoleSchema.virtual('PrimaryKey').get(function(){
	return 'roleId';
});

userRoleSchema.virtual('CollectionName').get(function(){
	return 'UserRole';
});

var UserRole = mongoose.model('UserRole',userRoleSchema);

module.exports = UserRole;

