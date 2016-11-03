(function(){

	angular.module('QofrQuants')
		.factory('forumService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var getTotalCount = function(con){

				var deffered = $q.defer();

				$http({
					method : 'GET',
					url    : modelName + apiUri + 'count',
					params : { condition : con }
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;

			};

			var getAllQuestions = function(con,option){
				var deffered = $q.defer();

				$http({
					method : 'GET',
					params : {condition : con, options : option},
					url    : baseUrl + 'search/' + apiUri
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

		});
})();