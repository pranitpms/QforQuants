(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Question',{
				url          : 'question',
				templateUrl  : 'app/question/question.html',
				controller   : 'questionController',
				controllerAs : 'question',
				authenticate : true,
				data         :{
               	  displayName: 'Questions'
                }
			});
		});
})();