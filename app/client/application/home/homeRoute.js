(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home',{
				url          : '/',
				templateUrl  : 'app/home/home.html',
				controller   : 'homeController',
				controllerAs : 'home',
				authenticate : false
			}).state('Home.Forum',{
				url          : 'forum',
				templateUrl  : 'app/home/forum/forum.html',
				controller   : 'forumController',
				controllerAs : 'forum',
				resolve      :{
					questions : function(forumService){
						return forumService.GetAllQuestions(1,null,null);
					},
					count : function(forumService){
						return forumService.GetTotalCount(null);
					}
				},
				authenticate : false
			}).state('Home.ForumView',{
				url          : 'forum/forumview/:questionId',
				templateUrl  : 'app/home/forum/forumview.html',
				controller   : 'forumviewController',
				controllerAs : 'forumview',
				authenticate :  false,
				resolve      : {
					replies  : function($stateParams,forumviewService){
						return forumviewService.GetAllReplys($stateParams.questionId);
					},
					questionDetails : function($stateParams,forumService){
						return forumService.GetQuestionById($stateParams.questionId);
					}
				}
			});
		});
})();