'use-strict';

var insertDocument = function(collection,json,done){

	collection.insert(json,function(err,result){
		if(err){
			console.log("error in inserting data");
		}else{
			console.log("Data inserted successfuly!!!");
			done();
		}
	});
};

module.exports = {
	InsertDocument : this.insertDocument
};
