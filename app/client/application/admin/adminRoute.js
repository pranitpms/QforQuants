(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Admin',{
				url          : '/admin',
				templateUrl  : 'app/admin/admin.html',
				controller   : 'adminController',
				controllerAs : 'admin',
				authenticate : true,
			}).state('Home.Admin.User',{
				url          : '/users',
				templateUrl  : 'app/admin/users/user.html',
				controller   : 'userController',
				controllerAs : 'user' ,
				authenticate : true,
				resolve      : {
					userList : function (userService){
						return userService.GetAllUsers();
					},
					formData : function(userFormConfig){
						return userFormConfig.GetFormData();
					}
				}
			}).state('Home.Admin.UserRole',{
				url          : '/userrole',
				templateUrl  : 'app/admin/userRole/userRole.html',
				controller   : 'userRoleController',
				controllerAs : 'role' ,
				authenticate : true,
				resolve      : {
					userRoleList : function (userRoleService){
						return userRoleService.GetAllRoles();
					}
				}
			}).state('Home.Admin.Category',{
				url          : '/category',
				templateUrl  : 'app/admin/category/category.html',
				controller   : 'categoryController',
				controllerAs : 'category' ,
				authenticate : true,
				resolve      : {
					categories : function (categoryService){
						return categoryService.GetAllCategory();
					}
				}
			});
		});
})();