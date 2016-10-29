(function(){

	angular.module('QforQuants')
		.factory('loginService',function($http,$q){

			var vm = this;
			var baseUrl = 'user/api/user';

			vm.createCondition = function(name,pass){
				var con = {
					userName : name,
					password : pass
				};
				return con;
			}

			vm.authenticateUser = function(userName,password){
				
				var deffered = $q.defer();

				var con = vm.createCondition(userName,password);
				$http({
					method : 'GET',
					params : {condition : con},
					url    : baseUrl
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};


			vm.registerUser = function(user){

				var deffered = $q.defer();

				$http({
					method : 'POST',
					data   : user,
					url    : baseUrl
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			return {
				AuthenticateUser : vm.authenticateUser,
				RegisterUser     : vm.registerUser
			}

		});
})();