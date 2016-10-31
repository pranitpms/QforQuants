(function(){

	angular.module('QforQuants')
		.controller('homeController',function(sessionService,$state){
			
			var init = function(){
				$state.go('Home.Forum');
			};
			
			var home = this;

			home.isAuthenticated = home.isActive = sessionService.IsAuthenticated || false ;
			home.user            = sessionService.User;
			home.userId          = sessionService.UserId;
			init();

			home.onLogout = function(){
				home.isActive = !home.isActive;
				sessionService.ClearStorage();
			};

			home.onAskButtonClick = function(){
				$state.go('Question');
			};
		});
})();




