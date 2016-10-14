'use-strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	userID        : { type: Number, required: true, unique: true , index: true},
	name          : { type: String, required: true},
	email         : { type: String, required: true, unique: true},
	password      : { type: String, required: true, unique: true},
	username      : { type: String, required: true, unique: true},
	mobile        : { type: String, required: true},
	qualification : { type: String, required: true},
	dateOfBirth   : { type: Date, required: true, unique: true},
	lastLogin     : Date,
	LastModify    : Number,
	role          : Number,
	lastModifyBy  : String
});


userSchema.virtual('PrimaryKey').get(function(){
	return 'userID';
});

userSchema.virtual('CollectionName').get(function(){
	return 'Users';
});

var Users = mongoose.model('Users',userSchema);

module.exports = Users;