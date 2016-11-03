(function(){

	angular.module('QforQuants')
		.factory('serviceFactory',function(forumService){
			

			var getServiceByName = function(name){
				switch(name){
					case 'forum' : return forumService;
				}
			};

			return {
				GetServiceByName : getServiceByName
			};

		});
})();