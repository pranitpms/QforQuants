(function(){

	angular.module('QforQuants')
		.controller('registerController',function(userFormConfig,loginService,$state){
			var register = this;


			register.user = userFormConfig.Model;
			register.user.lastModifyBy = register.user.username;

			register.onRegister = function(){

				var promise = loginService.RegisterUser(register.user);

				promise.then(function(result){
					console.log('register success');
					$state.go('Home');
				}).catch(function(error){
					console.log(error);
				});

			};

			//-------------------Calender Function--------------------------
			register.opened = false;
			register.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

           
            register.format = 'dd-MMMM-yyyy';


            var today = new Date();

            register.minDate = new Date();
            var minyear = today.getFullYear() - 50;
            register.minDate.setFullYear(minyear);

            register.maxDate = new Date();

            register.open = function ($event) {
               return register.opened = true;
            };

		})
})();