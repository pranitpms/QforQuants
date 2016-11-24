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
        'toastr',
        'angularTrix',
        'angular-input-stars',
        'angularUtils.directives.uiBreadcrumbs',
        'ghiscoding.validation', 
        'pascalprecht.translate',
        'iq-ui'
		])
		.config(function($urlRouterProvider, $anchorScrollProvider, $uiViewScrollProvider,$httpProvider){
			$urlRouterProvider.otherwise('/');
			$uiViewScrollProvider.useAnchorScroll();
            $anchorScrollProvider.disableAutoScrolling();

            $httpProvider.interceptors.push('spinnerConfig');
		});
})();