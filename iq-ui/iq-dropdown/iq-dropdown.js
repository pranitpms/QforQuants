
(function(){
	angular.module('iq-ui')
		.directive('iqDropdown',function(){
			return {
				template : '<p class="input-group">'+
								'<input type="text" uib-datepicker-popup="{{format}}" is-open="isopened" min-date="minDate"'+
								'max-date="maxDate" datepicker-options="dateOptions" close-text="Close" placeholder="{{::getPlaceHolder()}}"/>'+
								'<span class="input-group-btn">'+
									'<button type="button" class="btn btn-default" ng-click="open($event)" style="height: 34px;">'+
										'<i class="fa fa-calendar"></i>'+
									'</button>'+
								'</span>'+
							'</p>',
				restrict : 'AE',
				require  : ngModel,
				replace  : true,
				scope    :{
					config : '='
				},
				link     : function(scope, element, attrs){
					
				}
			};
		});
})();
