(function(){

	angular.module('QforQuants')
		.controller('homeController',function(sessionService){

			var home = this;

			home.isAuthenticated = home.isActive = sessionService.IsAuthenticated || false ;
			home.user            = sessionService.User;
			home.userId          = sessionService.UserId;


			home.onLogout = function(){
				home.isActive = !home.isActive;
				sessionService.ClearStorage();
			}
		});
})();




