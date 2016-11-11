(function(){

	angular.module('QforQuants')
		.factory('queryService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var saveQuery = function(model){
				var defered =  $q.defer();

				$http({
					method : 'POST',
					data   : model,
					url    : modelName + apiUri
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};
			
			return{
				SaveQuery : saveQuery
			};

		});
})();