/*
<p class="input-group">
    <input type="text" name="DateofBirth"  class="form-control" uib-datepicker-popup="{{register.format}}" ng-model="register.user.dateOfBirth" is-open="register.opened" min-date="register.minDate" max-date="register.maxDate" datepicker-options="register.dateOptions" close-text="Close" ng-change="register.onDateSelected()" placeholder="Date-of-Birth" validation="required" />
    <span class="input-group-btn">
        <button type="button" class="btn btn-default" ng-click="register.open($event)" style="height: 34px;">
            <i class="fa fa-calendar"></i>
        </button> 
    </span>
</p>
*/

(function(){
	angular.module('iq-ui')
		.directive('iqDatepicker',function(){
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

					scope.format      = 'dd-MMMM-yyyy';
					scope.isopened    = false;
					scope.dateOptions = {
		                formatYear: 'yy',
		                startingDay: 1
		            };

		            scope.minDate = scope.config.minDate;
		            scope.maxDate = scope.config.maxDate;
					
					scope.getPlaceHolder = function(){
						return scope.config.Label;
					};

					scope.open = function ($event) {
		                scope.isopened = true;
		                return true;
		            };
				}
			};
		});
})();
