(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home',{
				url          : '/',
				templateUrl  : 'app/home/home.html',
				controller   : 'homeController',
				controllerAs : 'home',
				authenticate : false,
			});
		});
})();