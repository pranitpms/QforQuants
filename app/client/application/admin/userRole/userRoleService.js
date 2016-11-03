(function(){

	angular.module('QforQuants')
		.factory('userRoleService',function($http,$q){

			var modelName = 'userrole';
			var apiUrl    = '/api/userrole';


			var getAll = function(){

				var defered = $q.defer();

					$http({
						method : 'GET',
						url    : modelName + apiUrl
					}).success(function(result){
						defered.resolve(result);
					}).error(function(error){
						defered.reject(error);
					});

				return defered.promise;
			};

			var save  = function(userRole){

				var defered =  $q.defer();

				$http({
					method : 'POST',
					data   : userRole,
					url    : modelName + apiUrl
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var update = function(data,id){
				var defered =  $q.defer();

				$http({
					method : 'PUT',
					data   : {update : data},
					url    : modelName + apiUrl +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var delet = function(id){
				var defered =  $q.defer();
				$http({
					method : 'DELETE',
					url    : modelName + apiUrl +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};


			return {
				GetAllRoles : getAll,
				SaveRole    : save,
				UpdateRole  : update,
				DeleteRole  : delet
			};

		});
})();