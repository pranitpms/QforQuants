
(function(){
	angular.module('iq-ui')
		.directive('iqInputEmail',function(){
			return {
				template : '<input type="email" placeholder="{{::getPlaceHolder()}}">',
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



