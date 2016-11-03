(function(){

	angular.module('QforQuants')
		.factory('formContext',function(CacheFactory,serviceFactory){
			var context = this;

			context.perPage   = 30;
			context.cacheName = 'formContextCache';
			context.cache;
			context.count;


			context.getData = function(pageNumber,condition,serviceName,sort){

				var instance =  serviceFactory.GetServiceByName(serviceName);
				getCache();
				cache.put('formCondition',json);

				var count = context.count || context.cache.get('TotalCount') || context.getCount(instance);

				





			};

			context.buildOptions = function(pageNumber,sort){
				var options = {
					limit : context.perPage,
					skip  : (context.perPage * pageNumber)
				};

				if(sort){
					options['sort'] = {sort.field : sort.order}
				}

				return options;
			};

			context.getCount = function(instance){

				var promise = instance.GetTotalCount();
				promise.then(function(result){
					context.count = result;		
					context.cache.put('TotalCount',result);
				}).catch(function(error){
					return error;
				});
			}

			data.getCache = function(){
				if(context.cache){
					return context.cache;
				}
				context.cache = CacheFactory.createCache(context.cacheName, {
			       				 deleteOnExpire: 'aggressive'
		      				});
			};

		})
})();