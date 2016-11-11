
(function(){

	angular.module('QforQuants')
		.run(function($rootScope, $state, sessionService,toastr) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            	
                if (toState.authenticate && !sessionService.IsAuthenticated) {
                	event.preventDefault();
                	
                    if(_.startsWith(toState.name,'Home.Admin')){
                    	toastr.error('You are not authorized user, please login with Admin credentials');
                    }
                    if(_.startsWith(toState.name,'Home.Question') || _.startsWith(toState.name,'Home.NewQuery')){
                    	toastr.warning('Before posting the question you need to sign in fisrt');
                    }
                    
                    $state.transitionTo("Home.Login");
                }
            });
        })
})();