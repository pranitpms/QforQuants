(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Admin',{
				url          : '/admin',
				templateUrl  : 'app/admin/admin.html',
				controller   : 'adminController',
				controllerAs : 'admin',
				authenticate : true,
			})
			.state('Admin.User',{
				url          : '/users',
				templateUrl  : '/app/users/user.html',
				controller   : 'userController',
				controllerAs : 'users' ,
				authenticate : true,
				resolve      : {
					userList : function (userService){
						return userService.GetAllUsers();
					},
					formData : function(userFormConfig){
						return userFormConfig.GetFormData();
					}
				}
			})
			;
		});
})();