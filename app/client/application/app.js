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
		])
		.config(function($urlRouterProvider, $anchorScrollProvider, $uiViewScrollProvider){
			$urlRouterProvider.otherwise('/');
			$uiViewScrollProvider.useAnchorScroll();
            $anchorScrollProvider.disableAutoScrolling();
		})
		.run(function($rootScope, $state, sessionService) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !sessionService.IsAuthenticate) {
                    $state.transitionTo("login");
                    event.preventDefault();
                }
            });
        });
})();