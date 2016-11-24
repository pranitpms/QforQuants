
(function(){
	angular.module('iq-ui')
		.directive('iqSearchBox',function(){
			return {
				templateUrl : 'directives/iq-searchBox/iq-searchBox-tplt.html',
				restrict : 'AE',
				scope    :{
				  onSearch : '&'
				},
				link     : function(scope, element, attrs){
					
					scope.searchText;
					scope.onClickSearch = scope.onSearch;
					scope.inputName = '';

					scope.getName = function(){
						scope.inputName = 'searchTextbox';
						return scope.inputName;
					};

					// scope.isValidInput = function(form){
					// 	return !form.searchTextbox.$dirty || form.searchTextbox.$invalid;
					// }


					
				}

			}
			
		});
})();


