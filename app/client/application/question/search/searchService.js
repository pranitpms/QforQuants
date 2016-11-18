(function(){

	angular.module('QforQuants')
		.factory('searchService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var searchQuestions = function(searchText,pageNumber){
				var deffered = $q.defer();
				var option = buildOptions(pageNumber);
				$http({
					method : 'GET',
					url    : modelName + '/textsearch' + apiUri + '/' + searchText,
					params : {options : option}
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};


			var searchCount = function(searchText){
				var deffered = $q.defer();

				$http({
					method : 'GET',
					url    : modelName + '/textsearchcount' + apiUri + '/' + searchText
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};
				
			var buildOptions = function(pageNumber){
				pageNumber = (pageNumber === 0) ? 0 : pageNumber - 1;

				var options = 'limit:20,skip:' + (20 * pageNumber);
				return options;
			};


			return{
				SearchQuestions : searchQuestions,
				SearchCount     : searchCount
			};

		});
})();