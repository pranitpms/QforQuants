//iq-input-password
(function(){
	angular.module('iq-ui')
		.directive('iqInputPassword',function(){
			return {
				template : '<input type="password" placeholder="{{::getPlaceHolder()}}">',
				restrict : 'AE',
				require  : ngModel,
				replace  : true,
				scope    :{
					config : '='
				},
				link     : function(scope, element, attrs){
					scope.getPlaceHolder(){
						return scope.config.Label;
					};
				}
			};
		});
})();



