(function(){

	angular.module('QforQuants')
		.controller('loginController',function($state,loginService,sessionService){

			var login = this;
			login.username = '';
			login.password = '';
			login.role     = '';

			login.onCancel = function(){
				$state.go('Home');
			};

			login.onAuthenticate = function(){

				if(!login.password && !login.username){
					alert('valuies required!!!');
				}

				var promise = loginService.AuthenticateUser(login.username,login.password);

				promise.then(function(result){
					if(result){
						sessionService.IsAuthenticated = true;
						sessionService.User            = result[0];
		 				sessionService.UserId          = result[0].userID;

		 				var role = result[0].role;
		 				if(role == 1){
		 					$state.go('Home');
		 				}
		 				else{
		 					$state.go('Admin');
		 				}
					}
					else{
						alert('user not found!!!');
					}
				}).catch(function(error){
					console.log(error);
				});
			}




		});
})();