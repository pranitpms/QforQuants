(function(){

	angular.module('QforQuants')
		.controller('homeController',function(sessionService,$state){
			var home = this;

			var init = function(){
				if($state.is('Home')){
					$state.go('Home.Forum');
				}
			};
			
			home.isAuthenticated = home.isActive = sessionService.IsAuthenticated || false ;
			home.user            = sessionService.User;
			home.userId          = sessionService.UserId;
			home.isAdmin         = sessionService.IsAdmin;

			init();

			home.onLogout = function(){
				home.isActive = !home.isActive;
				sessionService.ClearStorage();
				$state.go('Home',{}, {reload: true});
			};

			home.onAskButtonClick = function(){
				$state.go('Home.Question');
			};
			home.onQuestionClick = function(){
				$state.go('Home',{}, {reload: true});
			};

			home.onClickSearch = function(e){
				if(e.charCode === 13 && home.searchText){
					$state.go('Home.Search',{ text : home.searchText });
				}
				else{
					return;
				}
			};
		});
})();




