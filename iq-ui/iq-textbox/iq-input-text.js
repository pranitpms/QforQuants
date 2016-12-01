
/* <input type="text" name="UserName" class="form-control" 
ng-model="login.username" placeholder="Username" validation="required">
*/

(function(){
	angular.module('iq-ui')
		.directive('iqInputText',function(){
			return {
				template : '<input type="text" placeholder="{{::getPlaceHolder()}}">',
				restrict : 'AE',
				require  : ngModel,
				replace  : true,
				scope    :{
					config : '='
				},
				link     : function(scope, element, attrs){
					scope.getPlaceHolder = function(){
						return scope.config.Label;
					};
				}
			};
		});
})();



