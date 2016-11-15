'use-strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var replySchema = new Schema({
	replyId    : { type: Number, required: true, unique: true , index: true},
	reply      : String,
	questionId : Number,
	userId     : Number,
	_user      : [{ type: Schema.Types.ObjectId, ref: 'Users' }],
	rate       : Number,
	lastModify : Date,
	rate_1     : Number,
	rate_2     : Number,
	rate_3     : Number,
	rate_4     : Number,
	rate_5     : Number,
	avgRating  : Number
},
{ strict: false });


replySchema.virtual('PrimaryKey').get(function(){
	return 'replyId';
});

replySchema.virtual('CollectionName').get(function(){
	return 'Reply';
});

var Reply = mongoose.model('Reply',replySchema);

module.exports = Reply;

