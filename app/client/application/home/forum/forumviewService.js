(function(){

	angular.module('QforQuants')
		.factory('forumviewService',function($http,$q){

			var modelName = 'reply';
			var apiUri    = '/api/reply';

			var getAllReplys = function(id){

				var con = 'questionId:' + id 

				var deffered = $q.defer();

				$http({
					method : 'GET',
					params : {condition : con},
					url    : modelName + '/search' + apiUri,

				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var saveReply = function(model){
				var deffered = $q.defer();

				$http({
					method : 'POST',
					url    : modelName + apiUri,
					data   : model
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var updateReply = function(data,id){
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


			
			return{
				GetAllReplys : getAllReplys,
				SaveReply    : saveReply,
				UpdateReply  : updateReply
			};

		});
})();