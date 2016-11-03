(function(){

	angular.module('QforQuants')
		.controller('userController',function(userList,formData){

		var user   = this;
		var model    = formData.Model;
		
		user.config = {columns:[]}
		user.userList = userList || [];
		user.instance = model;

	});
})();