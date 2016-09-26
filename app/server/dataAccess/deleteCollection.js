'use-strict';

var deleteOne = function(collection,key,done){
	 collection.deleteOne(key,function(err,result){
		if(err){
			console.log('Error Deleting Document');
		}else{
			console.log(result);
			done();
		}
	});
};

var deleteMany = function(collection,key,done){
	 collection.deleteMany(key,function(err,result){
		if(err){
			console.log('Error Deleting Document');
		}else{
			console.log(result);
			done();
		}
	});
};

var deleteAll = function(collection,done){
	 collection.deleteMany({},function(err,result){
		if(err){
			console.log('Error Deleting Document');
		}else{
			console.log(result);
			done();
		}
	});
};


module.exports = {
	DeleteOne  : this.deleteOne,
	DeleteMany : this.deleteMany,
	DeleteAll  : this.deleteAll
};
