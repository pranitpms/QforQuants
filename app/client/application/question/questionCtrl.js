(function(){

		angular.module('QforQuants')
		.controller('questionController',function($state){
			var question = this;


			question.onProceedClick = function(){
				$state.go('Query');
			}


		});
})();