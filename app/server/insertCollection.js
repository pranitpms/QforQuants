'use-strict';

var insertDocument = function(collection,json,done){

	collection.insertOne(json,function(err,result){
		if(err){
			console.log("error in inserting data");
		}else{
			console.log("Data inserted successfuly!!!");
			done();
		}
	});
}

module.exports = insertDocument;