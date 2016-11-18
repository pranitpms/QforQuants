(function(){

	angular.module('QforQuants')
		.factory('forumService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var getTotalCount = function(con){

				var deffered = $q.defer();

				$http({
					method : 'GET',
					url    : modelName + '/count' + apiUri,
					params : { condition : con }
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;

			};

			var getAllQuestions = function(pageNumber,con,sort){

				var option = buildOptions(pageNumber,sort);
				var deffered = $q.defer();

				$http({
					method : 'GET',
					params : {condition : con, options : option},
					url    : modelName + '/search' + apiUri
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var getQuestionById = function(id){

				var deffered = $q.defer();
				$http({
					method : 'GET',
					url    : modelName + apiUri + '/' + id
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var updateQuestion = function(data,id){
				var defered =  $q.defer();

				$http({
					method : 'PUT',
					data   : {update : data},
					url    : modelName + apiUri +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var buildOptions = function(pageNumber,sort){

				pageNumber = (pageNumber === 0) ? 0 : pageNumber - 1;

				var options = 'limit : 15 , skip : '+ (15 * pageNumber);
				return options;
				
			};

			return{
				GetTotalCount   : getTotalCount,
				GetAllQuestions : getAllQuestions,
				GetQuestionById : getQuestionById,
				UpdateQuestion  : updateQuestion
			};

		});
})();