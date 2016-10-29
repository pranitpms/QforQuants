(function(){

	angular.module('QforQuants')
		.factory('userService',function($http,$q){

			var baseUrl = 'user/api/user';


            var getAllUsers = function(){
    			var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: baseUrl
                }).success(function(result) {
                    deferred.resolve(result);
                }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            return {
                GetAllUsers : getAllUsers
            };

		});
})();