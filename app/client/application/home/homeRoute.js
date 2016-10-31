(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home',{
				url          : '/',
				templateUrl  : 'app/home/home.html',
				controller   : 'homeController',
				controllerAs : 'home',
				authenticate : false,
			}).state('Home.Forum',{
				url          : 'forum',
				templateUrl  : 'app/home/forum/forum.html',
				controller   : 'forumController',
				controllerAs : 'forum',
				authenticate : false,
			}).state('Home.ForumView',{
				url          : 'forum/forumview',
				templateUrl  : 'app/home/forum/forumview.html',
				controller   : 'forumviewController',
				controllerAs : 'forumview',
				authenticate :  false,
			});
		});
})();