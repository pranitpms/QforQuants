'use-strict'

var updateOne = function(collection,setData,whereData,done){

	collection.updateOne(setData,whereData,function(err,result){
		if(err){
			console.log('Error Updating Document');
		}else{
			console.log(result);
			done();
		}
	});
};

var updateMany = function(collection,setData,whereData,done){
	collection.updateMany(setData,whereData,function(err,result){
		if(err){
			console.log('Error Updating Document');
		}else{
			console.log(result);
			done();
		}
	});
};

var replaceOne = function(collection,setData,whereData,done){
	collection.replaceOne(setData,whereData,function(err,result){
		if(err){
			console.log('Error Updating Document');
		}else{
			console.log(result);
			done();
		}
	});
};

module.exports = {
	
	UpdateOne  : this.updateOne,
	UpdateMany : this.updateMany,
	ReplaceOne : this.replaceOne
};