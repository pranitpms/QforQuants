(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Search',{
				url          : 'question/search/:text',
				templateUrl  : 'app/question/search/search.html',
				controller   : 'searchController',
				controllerAs : 'search',
				resolve      : {
				searchCount  :  function($stateParams,searchService){
						return searchService.SearchCount($stateParams.text);
					},
				  searchList : function($stateParams,searchService){
						return searchService.SearchQuestions($stateParams.text,1);
					},
				 searchText  : function($stateParams){
						return $stateParams.text;
					}
				},
				authenticate :  true,
				data         :{
               	  displayName: 'Search'
                }
			});
		});
})();