'use-strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
	categoryId   : { type: Number, required: true, unique: true , index: true},
	category     : String,
	lastModify   : Date,
	lastModifyBy : String
},
{ strict: false });


categorySchema.virtual('PrimaryKey').get(function(){
	return 'categoryId';
});

categorySchema.virtual('CollectionName').get(function(){
	return 'category';
});

var Category = mongoose.model('Category',categorySchema);

module.exports = Category;