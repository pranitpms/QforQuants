(function(){

	angular.module('QforQuants')
		.controller('registerController',function(userFormConfig,loginService,$state,toastr){
			var register = this;


			register.user = userFormConfig.Model;
			register.user.lastModifyBy = register.user.username;

			register.onRegister = function(isvalid){

				if(!isvalid){
					toastr.error('please enter valid data in the fields..');
					return;
				}

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
            var minyear = today.getFullYear() - 60;
            register.minDate.setFullYear(minyear);

            var maxyear = today.getFullYear() - 25;
            register.maxDate = new Date();
            register.maxDate.setFullYear(maxyear);

            register.open = function ($event) {
                register.opened = true;
                return true;
            };

		});
})();