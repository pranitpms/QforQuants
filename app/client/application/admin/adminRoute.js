(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Admin',{
				url          : 'admin',
				templateUrl  : '/app/admin/admin.html',
				controller   : 'adminController',
				controllerAs : 'admin'
			});
		});
})();