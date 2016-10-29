(function(){

	angular.module('QforQuants')
		.service('sessionService',function($sessionStorage,CacheFactory){

			var data = this;

			data.userId = '';
			data.user   = '';
			data.isAuthenticated = '';

			data.cacheName = 'userCache';
			data.cache = null;

			data.$storage = $sessionStorage.$default({
				userId :'',
				user   :'',
				isAuthenticated : ''
			});

			Object.defineProperties(this,{
				UserId : {
					get : function(){
						if(data.userId){
							return data.userId;
						}
						return data.retrive('userId')
					},
					set : function(val){
						data.userId = val;
						data.store('userId',val);
					}
				},
				User :{
					get : function(){
						if(data.user){
							return data.user;
						}
						return data.retrive('user');
					},
					set :function(val){
						data.user = val;
						data.store('user',val);
					}
				},
				IsAuthenticated : {
					get: function(){
						if(data.isAuthenticated){
							return data.isAuthenticated;
						}
						return data.retrive('isAuthenticated');
					},
					set : function(val){
						data.isAuthenticated = val;
						data.store('isAuthenticated',val);
					}
				}
			});

			data.store = function(key,value){
				var cache = data.getCache();
				cache.put(key,value);
				data.$storage[key] = value;
			};

			data.retrive = function(key){
				var cache = data.getCache();

				if(_.includes(cache,key)){
					return cache.get(key);
				}
				return data.$storage[key];
			};

			data.getCache = function(){
				if(data.cache){
					return data.cache;
				}
				data.cache = CacheFactory.createCache(data.cacheName, {
			       				 deleteOnExpire: 'aggressive'
		      				});
				return data.cache;
			};

			data.ClearStorage = function(){
				data.cache.clearAll();
				$sessionStorage.$reset;
				data.userId = '';
				data.user   = '';
				data.isAuthenticated = '';
			};

		});
})();