(function(){
	angular.module('QforQuants')
		.factory('spinnerConfig',function ($q) {
	        return {
	            'request': function (config) {
	                $("#spinner").show();
	                return config;
	            },

	            'requestError': function (rejection) {

	                if (canRecover(rejection)) {
	                    return responseOrNewPromise;
	                }
	                return $q.reject(rejection);
	            },



	            'response': function (response) {
	                $("#spinner").hide();
	                return response;
	            },

	            'responseError': function (rejection) {
	                $("#spinner").hide();
	                if (canRecover(rejection)) {
	                    return responseOrNewPromise;
	                }
	                return $q.reject(rejection);
	            }
	        };
        });
})();