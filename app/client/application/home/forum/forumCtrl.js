(function(){

	angular.module('QforQuants')
		.controller('forumController',function(){
			var element = angular.element($('#homeDiv'));
				element[0].hidden = false;
		});
})();