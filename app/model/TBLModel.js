
'use-strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tblSchema = new Schema({
	tblID          : { type: Number, required: true, unique: true , index: true},
	collectionName : String,
	fieldName      : String,
	val            : Number,
	LastValue      : Number,
});


tblSchema.virtual('PrimaryKey').get(function(){
	return 'tblID';
});

tblSchema.virtual('CollectionName').get(function(){
	return 'TBL';
});

var TBL = mongoose.model('TBL',tblSchema);

module.exports = TBL;

