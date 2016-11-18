(function(){

		angular.module('QforQuants')
			.controller('questionController',function($state){
			var question = this;
			question.searchText = '';

			question.onClickSearch = function(){
				if(question.searchText){
					$state.go('Home.Search',{ text : question.searchText});
				}
			};
		});
})();