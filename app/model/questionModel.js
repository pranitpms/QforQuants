'use-strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = new Schema({
	questionId : { type: Number, required: true, unique: true , index: true},
	catagoryId : Number,
	title      : String,
	question   : String,
	postDate   : Date,
	userId     : Number,
	rate       : Number,
	lastModify : Date
},
{ strict: false });

questionSchema.index({ question : 'text', title : 'text'});

questionSchema.virtual('PrimaryKey').get(function(){
	return 'questionId';
});

questionSchema.virtual('CollectionName').get(function(){
	return 'Questions';
});

var Questions = mongoose.model('Questions',questionSchema);

module.exports = Questions;

