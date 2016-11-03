(function(){
	'use-strict';

	angular.module('QforQuants',[
		'ui.bootstrap',
    	'ui.select',
    	'ui.router',
    	'ngSanitize',
    	'ngTouch',
    	'angular-cache',
    	'ngStorage',
        'toastr'
		])
		.config(function($urlRouterProvider, $anchorScrollProvider, $uiViewScrollProvider,$httpProvider){
			$urlRouterProvider.otherwise('/');
			$uiViewScrollProvider.useAnchorScroll();
            $anchorScrollProvider.disableAutoScrolling();

            $httpProvider.interceptors.push('spinnerConfig');
		})
		.run(function($rootScope, $state, sessionService,toastr) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !sessionService.IsAuthenticated) {
                    toastr.warning('You are not authenticated user, Please login with admin credentials');
                    sessionService.ClearStorage();
                    $state.transitionTo("Login");
                    event.preventDefault();
                }
            });
        });
})();