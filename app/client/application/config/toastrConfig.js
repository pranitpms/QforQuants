(function(){

	angular.module('QforQuants')
		.config(function(toastrConfig){
			var options = {
				  "closeButton"      : true,
				  "debug"            : false,
				  "progressBar"      : true,
				  "preventDuplicates": false,
				  "positionClass"    : "toast-top-full-width",
				  "onclick"          : null,
				  "showDuration"     : "400",
				  "hideDuration"     : "1000",
				  "timeOut"          : "7000",
				  "extendedTimeOut"  : "1000",
				  "showEasing"		 : "swing",
				  "hideEasing"		 : "linear",
				  "showMethod"		 : "fadeIn",
				  "hideMethod"		 : "fadeOut"
				};
			angular.extend(toastrConfig, options);
		});
})();