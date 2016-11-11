(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.NewQuery',{
				url          : 'question/query',
				templateUrl  : 'app/question/newQuery/query.html',
				controller   : 'queryController',
				controllerAs : 'query',
				resolve      : {
				  categories : function(categoryService){
					   return categoryService.GetAllCategory();
					}
				},
				authenticate : true
			});
		});
})();