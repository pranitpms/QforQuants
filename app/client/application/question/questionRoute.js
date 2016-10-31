(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Question',{
				url          : '/question',
				templateUrl  : 'app/question/question.html',
				controller   : 'questionController',
				controllerAs : 'question',
				authenticate : false
			});
		});
})();