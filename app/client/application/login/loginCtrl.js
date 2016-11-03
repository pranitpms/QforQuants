(function(){

	angular.module('QforQuants')
		.controller('loginController',function($state,loginService,sessionService,toastr){

			var login = this;
			login.username = '';
			login.password = '';
			login.role     = '';

			login.onCancel = function(){
				$state.go('Home');
			};

			login.onAuthenticate = function(){

				if(!login.password && !login.username){
					toastr.error('Username and Password is required.');
					return;
				}

				var promise = loginService.AuthenticateUser(login.username,login.password);

				promise.then(function(result){
					if(result){
						sessionService.IsAuthenticated = true;
						sessionService.User            = result[0];
		 				sessionService.UserId          = result[0].userID;

		 				var role = result[0].role;
		 				if(role == 0){
		 					sessionService.IsAdmin = true;
		 				}
		 				else{
		 					sessionService.IsAdmin = false;
		 				}
		 				$state.go('Home');
					}
					else{
						toastr.error('user not found!!!');
					}
				}).catch(function(error){
					toastr.error(error);
					console.log(error);
				});
			}




		});
})();