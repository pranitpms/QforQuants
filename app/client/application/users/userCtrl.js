(function(){

	angular.module('QforQuants')
		.controller('userController',function(userList,formData){

		var users   = this;
		users.list  = [];
		user.config.columns = [];

		users.list   = userList;
		users.config.columns = formData;	
		

	});
})();