(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Login',{
				url          : 'login',
				templateUrl  : 'app/login/login.html',
				controller   : 'loginController',
				controllerAs : 'login',
				authenticate : false
			})
			.state('Home.Register',{
				url          : 'register',
				templateUrl  : 'app/login/register.html',
				controller   : 'registerController',
				controllerAs : 'register',
				authenticate : false
			});
		});
})();