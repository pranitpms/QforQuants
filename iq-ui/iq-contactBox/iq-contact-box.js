
(function(){
	angular.module('iq-ui')
		.directive('iqContactBox',function(){
			return {
				templateUrl : 'directives/iq-contactBox/iq-contactBox-tplt.html',
				restrict : 'AE',
				scope    :{
					config : '='
				},
				link     : function(scope, element, attrs){
					scope.users = scope.config;
				}

			}
			
		});
})();
