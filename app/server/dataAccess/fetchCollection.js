'use-strict';

var fetchAll = function(collection,done){

	var dataset = collection.find();
	if(dataset){
		done();
	}else{
		console.log('error in featching the document');
	}

};

var fetchByOptions = function(collection,options,done){
	var dataset = collection.find(options);
	if(dataset){
		done();
	}else{
		console.log('error in featching the document');
	}
};

module.exports = {
	FetchAll       : this.fetchAll,
	FetchByOptions : this.fetchByOptions
};