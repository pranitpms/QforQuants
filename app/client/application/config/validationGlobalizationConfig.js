(function(){

	angular.module('QforQuants')
		.config(function ($translateProvider) {
			  
			  $translateProvider.useStaticFilesLoader({
			    prefix: 'bower_components/angular-validation-ghiscoding/locales/validation/',
			    suffix: '.json'
			  });

			  // define translation maps you want to use on startup
			  $translateProvider.useSanitizeValueStrategy('sanitize');
			  $translateProvider.preferredLanguage('en');
		});
})();