(function(){
	'use-strict';

	angular.module('QforQuants',[
		'ui.bootstrap',
    	'ui.select',
    	'ui.router',
    	'ngSanitize',
    	'ngTouch',
    	'angular-cache',
    	'ngStorage',
        'toastr',
        'angularTrix',
        'angular-input-stars',
        'angularUtils.directives.uiBreadcrumbs',
        'ghiscoding.validation', 
        'pascalprecht.translate',
        'iq-ui'
		])
		.config(function($urlRouterProvider, $anchorScrollProvider, $uiViewScrollProvider,$httpProvider){
			$urlRouterProvider.otherwise('/');
			$uiViewScrollProvider.useAnchorScroll();
            $anchorScrollProvider.disableAutoScrolling();

            $httpProvider.interceptors.push('spinnerConfig');
		});
})();;


(function(){
	angular.module('iq-ui',[
		'ui.select', 
		'ui.bootstrap', 
		'ui.router', 
		'ngSanitize'
	]);
})();;
(function(){

	angular.module('QforQuants')
		.controller('adminController',function(){
			var admin = this;

			var elemen = angular.element($('#homeDiv'));
			elemen[0].hidden =true;
	});
})();;
(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Admin',{
				url          : 'admin',
				templateUrl  : 'app/admin/admin.html',
				controller   : 'adminController',
				controllerAs : 'admin',
				authenticate : true,
				Data         : {
               	  displayName: 'Admin'
                }
			}).state('Home.Admin.User',{
				url          : 'users',
				templateUrl  : 'app/admin/users/user.html',
				controller   : 'userController',
				controllerAs : 'user' ,
				authenticate : true,
				resolve      : {
					userList : function (userService){
						return userService.GetAllUsers();
					},
					formData : function(userFormConfig){
						return userFormConfig.GetFormData();
					}
				},
				Data         : {
               	  displayName: 'Users'
                }
			}).state('Home.Admin.UserRole',{
				url          : 'userrole',
				templateUrl  : 'app/admin/userRole/userRole.html',
				controller   : 'userRoleController',
				controllerAs : 'role' ,
				authenticate : true,
				resolve      : {
					userRoleList : function (userRoleService){
						return userRoleService.GetAllRoles();
					}
				},
				Data         : {
               	  displayName: 'User Roles'
                }
			}).state('Home.Admin.Category',{
				url          : 'category',
				templateUrl  : 'app/admin/category/category.html',
				controller   : 'categoryController',
				controllerAs : 'category' ,
				authenticate : true,
				resolve      : {
					categories : function (categoryService){
						return categoryService.GetAllCategory();
					}
				},
				Data         : {
               	  displayName: 'Category'
                }
			});
		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('categoryController',function(categories,categoryFormConfig,categoryService,toastr){

			var category = this;
			var model    = categoryFormConfig.Model;
			category.config = {
				columns:[]
			};

			category.dataList = categories || [];
			category.instance = angular.copy(model);
			category.addMode  = false;

			category.config.columns = categoryFormConfig.GetFormData();


			category.toggleAddMode = function(){
				category.addMode = !category.addMode;
				category.instance = angular.copy(model);
			};

			category.toggleEditMode = function(data){
				data.editMode = !data.editMode;
			};

			category.addObject = function(){
			var promise = categoryService.SaveCategory(category.instance);

			promise.then(function(result){
				toastr.success('Record Saved Successfuly!!!');
				category.dataList.push(result);
			}).catch(function(error){
				toastr.error(error);
				console.log(error);
			});
		};


		category.updateObject = function(data){
			var promise = categoryService.UpdateCategory(data,data._id);

			promise.then(function(result){
				toastr.success('Record Updated Successfuly!!!');
				var index = _.findIndex(category.dataList,function(cat){
					return cat.categoryId === result.categoryId;
				});
                category.dataList[index] = result;
			}).catch(function(error){
				toastr.error(error);
				console.log(error);
			});
		};

		category.deleteObject = function(data){
			var promise = categoryService.DeleteCategory(data._id);

			promise.then(function(result){
				toastr.success('Record Deleted Successfuly!!!');
				var index = _.findIndex(category.dataList,function(cat){
					return cat.categoryId === result.categoryId;
				});
                category.dataList.splice(index, 1);
			}).catch(function(error){
				toastr.error(error);
				console.log(error);
			});
		};
		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('categoryService',function($http,$q){

			var modelName = 'category';
			var apiUrl    = '/api/category';


			var getAll = function(){

				var defered = $q.defer();

					$http({
						method : 'GET',
						url    : modelName + apiUrl
					}).success(function(result){
						defered.resolve(result);
					}).error(function(error){
						defered.reject(error);
					});

				return defered.promise;
			};

			var save  = function(userRole){

				var defered =  $q.defer();

				$http({
					method : 'POST',
					data   : userRole,
					url    : modelName + apiUrl
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var update = function(data,id){
				var defered =  $q.defer();

				$http({
					method : 'PUT',
					data   : {update : data},
					url    : modelName + apiUrl +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var delet = function(id){
				var defered =  $q.defer();
				$http({
					method : 'DELETE',
					url    : modelName + apiUrl +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};


			return {
				GetAllCategory : getAll,
				SaveCategory   : save,
				UpdateCategory : update,
				DeleteCategory : delet
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('userRoleController',function(userRoleList,userRoleFormConfig,userRoleService){

		var role   = this;
		var model    = userRoleFormConfig.Model;
		
		role.config = {columns:[]};
		role.dataList = userRoleList || [];
		role.instance = angular.copy(model);
		role.addMode  = false;

		role.config.columns = userRoleFormConfig.GetFormData();
		
		role.toggleAddMode = function(){
				role.addMode = !role.addMode;
				role.instance = angular.copy(model);
			};

		role.toggleEditMode = function(data){
			data.editMode = !data.editMode;
		};

		role.addObject = function(){
			var promise = userRoleService.SaveRole(role.instance);

			promise.then(function(result){
				role.dataList.push(result);
			}).catch(function(error){
				console.log(error);
			});
		};


		role.updateObject = function(data){
			var promise = userRoleService.UpdateRole(data,data._id);

			promise.then(function(result){
				var index = _.findIndex(role.dataList,function(role){
					return role.roleId === result.roleId;
				});
                role.dataList[index] = result;
			}).catch(function(error){
				console.log(error);
			});
		};

		role.deleteObject = function(data){
			var promise = userRoleService.DeleteRole(data._id);

			promise.then(function(result){
				var index = _.findIndex(role.dataList,function(role){
					return role.roleId === result.roleId;
				});
                role.dataList.splice(index, 1);
			}).catch(function(error){
				console.log(error);
			});
		};

	});
})();;
(function(){

	angular.module('QforQuants')
		.factory('userRoleService',function($http,$q){

			var modelName = 'userrole';
			var apiUrl    = '/api/userrole';


			var getAll = function(){

				var defered = $q.defer();

					$http({
						method : 'GET',
						url    : modelName + apiUrl
					}).success(function(result){
						defered.resolve(result);
					}).error(function(error){
						defered.reject(error);
					});

				return defered.promise;
			};

			var save  = function(userRole){

				var defered =  $q.defer();

				$http({
					method : 'POST',
					data   : userRole,
					url    : modelName + apiUrl
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var update = function(data,id){
				var defered =  $q.defer();

				$http({
					method : 'PUT',
					data   : {update : data},
					url    : modelName + apiUrl +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var delet = function(id){
				var defered =  $q.defer();
				$http({
					method : 'DELETE',
					url    : modelName + apiUrl +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};


			return {
				GetAllRoles : getAll,
				SaveRole    : save,
				UpdateRole  : update,
				DeleteRole  : delet
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('userController',function(userList,formData){

		var user   = this;
		var model    = formData.Model;
		
		user.config = {columns:[]};
		user.userList = userList || [];
		user.instance = model;

	});
})();;
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
})();;
(function(){

	angular.module('QforQuants')
		.service('sessionService',function($sessionStorage,CacheFactory){

			var data = this;

			data.userId = '';
			data.user   = '';
			data.isAuthenticated = '';
			data.isAdmin = '';

			data.cacheName = 'userCache';
			data.cache = null;

			data.$storage = $sessionStorage.$default({
				userId :'',
				user   :'',
				isAuthenticated : '',
				isAdmin : ''
			});

			Object.defineProperties(this,{
				UserId : {
					get : function(){
						if(data.userId){
							return data.userId;
						}
						return data.retrive('userId');
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
				},
				IsAdmin : {
					get: function(){
						if(data.isAdmin){
							return data.isAdmin;
						}
						return data.retrive('isAdmin');
					},
					set : function(val){
						data.isAdmin = val;
						data.store('isAdmin',val);
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
				data.cache.removeAll();
				data.$storage.$reset();
				$sessionStorage.$reset();
				data.userId = '';
				data.user   = '';
				data.isAuthenticated = '';
				data.isAdmin = '';
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('userService',function($http,$q){

			var baseUrl = 'user/api/user';


            var getAllUsers = function(){
    			var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: baseUrl
                }).success(function(result) {
                    deferred.resolve(result);
                }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            return {
                GetAllUsers : getAllUsers
            };

		});
})();;

(function(){

	angular.module('QforQuants')
		.run(function($rootScope, $state, sessionService,toastr) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            	
                if (toState.authenticate && !sessionService.IsAuthenticated) {
                	event.preventDefault();
                	
                    if(_.startsWith(toState.name,'Home.Admin')){
                    	toastr.error('You are not authorized user, please login with Admin credentials');
                    }
                    if(_.startsWith(toState.name,'Home.Question') || _.startsWith(toState.name,'Home.NewQuery')){
                    	toastr.warning('Before posting the question you need to sign in fisrt');
                    }
                    
                    $state.transitionTo("Home.Login");
                }
            });
        });
})();;
(function(){
	angular.module('QforQuants')
		.factory('spinnerConfig',function ($q) {
	        return {
	            'request': function (config) {
	                $("#spinner").show();
	                return config;
	            },

	            'requestError': function (rejection) {

	                if (canRecover(rejection)) {
	                    return responseOrNewPromise;
	                }
	                return $q.reject(rejection);
	            },



	            'response': function (response) {
	                $("#spinner").hide();
	                return response;
	            },

	            'responseError': function (rejection) {
	                $("#spinner").hide();
	                if (canRecover(rejection)) {
	                    return responseOrNewPromise;
	                }
	                return $q.reject(rejection);
	            }
	        };
        });
})();;
(function(){

	angular.module('QforQuants')
		.config(function(toastrConfig){
			var options = {
				  "closeButton"      : true,
				  "debug"            : false,
				  "progressBar"      : true,
				  "preventDuplicates": false,
				  "positionClass"    : "toast-top-full-width",
				  "onclick"          : null,
				  "showDuration"     : "400",
				  "hideDuration"     : "1000",
				  "timeOut"          : "7000",
				  "extendedTimeOut"  : "1000",
				  "showEasing"		 : "swing",
				  "hideEasing"		 : "linear",
				  "showMethod"		 : "fadeIn",
				  "hideMethod"		 : "fadeOut"
				};
			angular.extend(toastrConfig, options);
		});
})();;
(function(){

	angular.module('QforQuants')
		.config(function ($translateProvider) {
			  
			  $translateProvider.useStaticFilesLoader({
			    prefix: 'bower_components/angular-validation-ghiscoding/locales/validation/',
			    suffix: '.json'
			  });

			  // define translation maps you want to use on startup
			  $translateProvider.useSanitizeValueStrategy('sanitize');
			  $translateProvider.preferredLanguage('en');
		});
})();;
(function(){

	angular.module('QforQuants')
		.service('categoryFormConfig',function(){

			var vm = this;
			vm.formData = [];

			vm.GetFormData = function(){

				vm.formData = [
					{ fieldName : 'categoryId', label: '',              dataType: 'number', isPrimary : true,  isVisible : false, order : 0},
					{ fieldName : 'category',   label: 'Category Name', dataType: 'text', isPrimary : false, isVisible : true,  order : 1},
				];

				return vm.formData;

			};


			Object.defineProperties(this,{
				Model : {
					get : function(){
						return vm.model;
					}
				}
			});

			vm.model = {
				categoryId   : 0 ,
				category     : '',
				LastModify   : '',
				lastModifyBy : ''
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.service('questionFormConfig',function(){

			var vm = this;
			vm.formData = [];

			vm.GetFormData = function(){

				vm.formData = [
					{ fieldName : 'questionId',    label: '',              dataType: 'Number',   isPrimary : true,  isVisible : false, order : 0},
					{ fieldName : 'title',     	   label: 'Title',         dataType: 'String',   isPrimary : false, isVisible : true, order : 2},
					{ fieldName : 'question',      label: 'Question',      dataType: 'String',   isPrimary : false, isVisible : true, order : 3},
					{ fieldName : 'postDate',      label: 'PostDate',      dataType: 'String',   isPrimary : false, isVisible : true, order : 4},
					{ fieldName : 'rate',          label: 'Rating',        dataType: 'Number',   isPrimary : false, isVisible : true, order : 5},
				];

				return vm.formData;

			};


			Object.defineProperties(this,{
				Model : {
					get : function(){
						return vm.model;
					}
				}
			});

			vm.model = {
				questionId : 0,
				catagoryId : 0,
				title      : '',
				question   : '',
				postDate   : '',
				userId     : 0,
				rate       : 0,
				lastModify : ''
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.service('userFormConfig',function(){

			var vm = this;
			vm.formData = [];

			vm.GetFormData = function(){

				vm.formData = [
					{ fieldName : 'userID',        label: '',              dataType: 'Number',   isPrimary : true,  isVisible : false, order : 0},
					{ fieldName : 'name',      	   label: 'Name',          dataType: 'String',   isPrimary : false, isVisible : true,  order : 1},
					{ fieldName : 'email',     	   label: 'E-mail',        dataType: 'String',   isPrimary : false, isVisible : false, order : 2},
					{ fieldName : 'username',      label: 'UserName',      dataType: 'String',   isPrimary : false, isVisible : false, order : 3},
					{ fieldName : 'password',      label: 'Password',      dataType: 'String',   isPrimary : false, isVisible : false, order : 4},
					{ fieldName : 'mobile',        label: 'Mobile No.',    dataType: 'Number',   isPrimary : false, isVisible : false, order : 5},
					{ fieldName : 'qualification', label: 'Qualification', dataType: 'String',   isPrimary : false, isVisible : false, order : 6},
					{ fieldName : 'dateOfBirth',   label: 'Birth-Date',    dataType: 'DateTime', isPrimary : false, isVisible : false, order : 7},
					{ fieldName : 'role',     	   label: 'Role',          dataType: 'String',   isPrimary : false, isVisible : false, order : 8}
				];

				return vm.formData;

			};


			Object.defineProperties(this,{
				Model : {
					get : function(){
						return vm.model;
					}
				}
			});

			vm.model = {
				userID        : 0 ,
				name          : '',
				email         : '',
				password      : '',
				username      : '',
				mobile        : '',
				qualification : '',
				dateOfBirth   : '',
				lastLogin     : '',
				LastModify    : '',
				role          : 1,
				lastModifyBy  : ''
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.service('userRoleFormConfig',function(){

			var vm = this;
			vm.formData = [];

			vm.GetFormData = function(){

				vm.formData = [
					{ fieldName : 'roleId',   label: '',          dataType: 'number', isPrimary : true,  isVisible : false, order : 0},
					{ fieldName : 'roleName', label: 'Role Name', dataType: 'text', isPrimary : false, isVisible : true,  order : 1},
				];

				return vm.formData;

			};


			Object.defineProperties(this,{
				Model : {
					get : function(){
						return vm.model;
					}
				}
			});

			vm.model = {
				roleId   : 0 ,
				roleName     : '',
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('forumController',function(questions,count,forumService,toastr,sessionService){
			var element = angular.element($('#homeDiv'));
				if(element[0].hidden){
					element[0].hidden = false;
				}

			var forum = this;
			forum.count = count || 0;
			forum.pages = 0;
			forum.questions = questions;
			forum.firstPage = 1;
			forum.lastPage  = 0;
			forum.currentPage = 1;
			forum.sort = null;
			forum.condition = null;


			forum.createPages = function(){

				var pageCount = forum.count / 15;
				var range = [];
				for(var i = 0; i < pageCount ; i++) {
				  range.push( i+1 );
				}

				forum.lastPage = range.length;
				return range;
			};

			forum.pages = forum.createPages();

			forum.onClickPageButton = function(page){
				forum.currentPage = page ; 

				var promise = forumService.GetAllQuestions(page,forum.condition,forum.sort);

				promise.then(function(result){
					forum.questions = result;
				}).catch(function(error){
					toastr.error(error);
				});
			};

			forum.onClickNextButton = function(){
				if(forum.currentPage < forum.lastPage){
					
					forum.currentPage ++;
					var promise = forumService.GetAllQuestions(forum.currentPage,forum.condition,forum.sort);
					

					promise.then(function(result){
						forum.questions = result;
					}).catch(function(error){
						toastr.error(error);
					});
				}
			};

			forum.onClickPrevButton = function(){
				if(forum.currentPage > forum.firstPage){
					
					forum.currentPage --;
					var promise = forumService.GetAllQuestions(forum.currentPage,forum.condition,forum.sort);

					promise.then(function(result){
						forum.questions = result;
					}).catch(function(error){
						toastr.error(error);
					});
				}
			};

			forum.onClickUpRate = function(obj){
				if(!sessionService.IsAuthenticated){
					toastr.error('You need to login, inorder to rate this qestion');
					return;
				}

				obj.rate = obj.rate + 1;
				var promise = forumService.UpdateQuestion(obj,obj._id);

				promise.then(function(result){
					var index = _.findIndex(forum.questions,function(que){
						return que.questionId === result.questionId;
					});
	                forum.questions[index] = result;
	                toastr.success('Rating is added successfuly..!!!');
				}).catch(function(error){
					console.log(error);
					toastr.error(error);
				});
			};

			forum.onClickDownRate = function(obj){
				if(!sessionService.IsAuthenticated){
					toastr.error('You need to login, inorder to rate this qestion');
					return;
				}
				
				obj.rate = obj.rate - 1;
				var promise = forumService.UpdateQuestion(obj,obj._id);

				promise.then(function(result){
					var index = _.findIndex(forum.questions,function(que){
						return que.questionId === result.questionId;
					});
	                forum.questions[index] = result;
	                toastr.success('Rating is added successfuly..!!!');
				}).catch(function(error){
					console.log(error);
					toastr.error(error);
				});
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('forumService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var getTotalCount = function(con){

				var deffered = $q.defer();

				$http({
					method : 'GET',
					url    : modelName + '/count' + apiUri,
					params : { condition : con }
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;

			};

			var getAllQuestions = function(pageNumber,con,sort){

				var option = buildOptions(pageNumber,sort);
				var deffered = $q.defer();

				$http({
					method : 'GET',
					params : {condition : con, options : option},
					url    : modelName + '/search' + apiUri
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var getQuestionById = function(id){

				var deffered = $q.defer();
				$http({
					method : 'GET',
					url    : modelName + apiUri + '/' + id
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var updateQuestion = function(data,id){
				var defered =  $q.defer();

				$http({
					method : 'PUT',
					data   : {update : data},
					url    : modelName + apiUri +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};

			var buildOptions = function(pageNumber,sort){

				pageNumber = (pageNumber === 0) ? 0 : pageNumber - 1;

				var options = 'limit : 15 , skip : '+ (15 * pageNumber);
				return options;
				
			};

			return{
				GetTotalCount   : getTotalCount,
				GetAllQuestions : getAllQuestions,
				GetQuestionById : getQuestionById,
				UpdateQuestion  : updateQuestion
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('forumviewController',function(questionDetails,replies,forumviewService,sessionService,toastr){
			var forumview = this;
		
			forumview.questionDetails = questionDetails;
			forumview.replies         = replies;
			forumview.avrageRating    = 0;


			var star1 = 1;
			var star2 = 2;
			var star3 = 3;
			var star4 = 4;
			var star5 = 5;

			forumview.model = {};

			var initModel = function(){
				forumview.model = {
					replyId    : 0,
					reply      : '',
					questionId : forumview.questionDetails.questionId,
					userId     : '',
					_user      : '',
					rate       : 0,
					lastModify : '',
					rate_1     : 0,
					rate_2     : 0,
					rate_3     : 0,
					rate_4     : 0,
					rate_5     : 0,
					avgRating  : 0
				};
			};

		//	var setOldValue = 
			
			initModel();

			forumview.onClickSave = function(){
				
				if(!sessionService.IsAuthenticated){
					toastr.warning('to post your reply.. please login first...');
					return;
				}

				forumview.model.lastModify = new Date();
				forumview.model.userId = sessionService.UserId;
				forumview.model._user  = sessionService.User._id;

				var promise = forumviewService.SaveReply(forumview.model);

				promise.then(function(result){
					toastr.success('Reply Added successfuly...!');
					forumview.replies.push(result);
					initModel();
				}).catch(function(error){
					toastr.error(error);
				});
			};

			 forumview.onClickReplyStar = function(index,replyObj){

			 	if(!sessionService.IsAuthenticated){
					toastr.error('To Add your reply.. please login first...');

					replyObj.avgRating = forumview.calculateAvgRating(replyObj);
					return;
				}

		 		forumview.setValue(index,replyObj);
		 		replyObj.rate = replyObj.rate + 1;
			 	replyObj.avgRating = forumview.calculateAvgRating(replyObj);

			 	var promise = forumviewService.UpdateReply(replyObj,replyObj._id);

				promise.then(function(result){
					var index = _.findIndex(forumview.replies,function(rep){
						return rep.replyId === result.replyId;
					});
	                forumview.replies[index] = result;
	                toastr.success('Rating is added successfuly..!!!');
				}).catch(function(error){
					console.log(error);
					toastr.error(error);
				});
			 };


			 forumview.calculateAvgRating = function(replyObj){
			 	 return ((replyObj.rate_1 * star1) + (replyObj.rate_2 * star2) +(replyObj.rate_3 * star3) +
			 		(replyObj.rate_4 * star4) +(replyObj.rate_5 * star5)) / replyObj.rate;
			 };

			 forumview.setValue = function(index,replyObj){
			 	 switch(index){
			 	 	case 1 :  replyObj.rate_1 = parseInt(replyObj.rate_1) + 1;
			 	 			  break;
			 	 	case 2 :  replyObj.rate_2 = parseInt(replyObj.rate_2) + 1;
			 	 			  break;
			 	 	case 3 :  replyObj.rate_3 = parseInt(replyObj.rate_3) + 1;
			 	 			  break;
			 	 	case 4 :  replyObj.rate_4 = parseInt(replyObj.rate_4) + 1;
			 	 			  break;
			 	 	case 5 :  replyObj.rate_5 = parseInt(replyObj.rate_5) + 1;
			 	 			  break;
			 	 }
			 };
		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('forumviewService',function($http,$q){

			var modelName = 'reply';
			var apiUri    = '/api/reply';

			var getAllReplys = function(id){

				var con = 'questionId:' + id;

				var deffered = $q.defer();

				$http({
					method : 'GET',
					params : {condition : con},
					url    : modelName + '/search' + apiUri,

				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var saveReply = function(model){
				var deffered = $q.defer();

				$http({
					method : 'POST',
					url    : modelName + apiUri,
					data   : model
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			var updateReply = function(data,id){
				var defered =  $q.defer();

				$http({
					method : 'PUT',
					data   : {update : data},
					url    : modelName + apiUri +'/'+id
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};


			
			return{
				GetAllReplys : getAllReplys,
				SaveReply    : saveReply,
				UpdateReply  : updateReply
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('homeController',function(sessionService,$state){
			var home = this;

			var init = function(){
				if($state.is('Home')){
					$state.go('Home.Forum');
				}
			};
			
			
			home.isAuthenticated = home.isActive = sessionService.IsAuthenticated || false ;
			home.user            = sessionService.User;
			home.userId          = sessionService.UserId;
			home.isAdmin         = sessionService.IsAdmin;

			init();

			home.onLogout = function(){
				home.isActive = !home.isActive;
				sessionService.ClearStorage();
				$state.go('Home',{}, {reload: true});
			};

			home.onAskButtonClick = function(){
				$state.go('Home.Question');
			};
			home.onQuestionClick = function(){
				$state.go('Home',{}, {reload: true});
			};

			home.onClickSearch = function(e){
				if(e.charCode === 13 && home.searchText){
					$state.go('Home.Search',{ text : home.searchText });
				}
				else{
					return;
				}
			};
		});
})();




;
(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home',{
				url          : '/',
				templateUrl  : 'app/home/home.html',
				controller   : 'homeController',
				controllerAs : 'home',
				authenticate : false,
				Data         : {
               	  displayName: 'Home',
                }
			}).state('Home.Forum',{
				url          : 'forum',
				templateUrl  : 'app/home/forum/forum.html',
				controller   : 'forumController',
				controllerAs : 'forum',
				resolve      :{
					questions : function(forumService){
						return forumService.GetAllQuestions(1,null,null);
					},
					count : function(forumService){
						return forumService.GetTotalCount(null);
					}
				},
				authenticate : false,
				Data         : {
               	  displayName: 'Forum '
                }
			}).state('Home.ForumView',{
				url          : 'forum/forumview/:questionId',
				templateUrl  : 'app/home/forum/forumview.html',
				controller   : 'forumviewController',
				controllerAs : 'forumview',
				authenticate :  false,
				resolve      : {
					replies  : function($stateParams,forumviewService){
						return forumviewService.GetAllReplys($stateParams.questionId);
					},
					questionDetails : function($stateParams,forumService){
						return forumService.GetQuestionById($stateParams.questionId);
					}
				},
				data         :{
               	  displayName: 'Forum View'
                }
			});
		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('loginController',function($state,loginService,sessionService,toastr){

			var login = this;
			login.username = '';
			login.password = '';
			login.role     = '';

			login.onCancel = function(){
				$state.go('Home',{}, {reload: true});
			};

			login.onAuthenticate = function(isValid){

				if(!isValid){
					toastr.error('please enter reqired information in the field');
					return;
				}

				if(!login.password && !login.username){
					toastr.error('Username and Password is required.');
					return;
				}

				var promise = loginService.AuthenticateUser(login.username,login.password);

				promise.then(function(result){
					if(result || result.length !== 0 ){
						sessionService.IsAuthenticated = true;
						sessionService.User            = result[0];
		 				sessionService.UserId          = result[0].userID;

		 				var role = result[0].role;
		 				if(role === 0){
		 					sessionService.IsAdmin = true;
		 				}
		 				else{
		 					sessionService.IsAdmin = false;
		 				}
		 				$state.go('Home',{}, {reload: true});
					}
					else{
						toastr.error('user not found!!! \n please enter valid user name.');
						return;
					}
				}).catch(function(error){
					toastr.error(error);
					console.log(error);
				});
			};
		});
})();;
(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Login',{
				url          : 'login',
				templateUrl  : 'app/login/login.html',
				controller   : 'loginController',
				controllerAs : 'login',
				authenticate : false
			})
			.state('Home.Register',{
				url          : 'register',
				templateUrl  : 'app/login/register.html',
				controller   : 'registerController',
				controllerAs : 'register',
				authenticate : false
			});
		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('loginService',function($http,$q){

			var vm      = this;
			var apiUri  = 'api/user';
			var baseUrl = 'user/';

			vm.createCondition = function(name,pass){
					var con = 'username:' + name + ',password:' + pass ;
				return con;
			};

			vm.authenticateUser = function(userName,password){
				
				var deffered = $q.defer();

				var con = vm.createCondition(userName,password);
				$http({
					method : 'GET',
					params : {condition : con},
					url    : baseUrl + 'search/' + apiUri
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};


			vm.registerUser = function(user){

				var deffered = $q.defer();

				$http({
					method : 'POST',
					data   : user,
					url    : baseUrl + apiUri
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};

			return {
				AuthenticateUser : vm.authenticateUser,
				RegisterUser     : vm.registerUser
			};

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('registerController',function(userFormConfig,loginService,$state,toastr){
			var register = this;


			register.user = userFormConfig.Model;
			register.user.lastModifyBy = register.user.username;

			register.onRegister = function(isvalid){

				if(!isvalid){
					toastr.error('please enter valid data in the fields..');
					return;
				}

				var promise = loginService.RegisterUser(register.user);

				promise.then(function(result){
					console.log('register success');
					$state.go('Home');
				}).catch(function(error){
					console.log(error);
				});

			};

			//-------------------Calender Function--------------------------
			register.opened = false;
			register.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

           
            register.format = 'dd-MMMM-yyyy';


            var today = new Date();

            register.minDate = new Date();
            var minyear = today.getFullYear() - 60;
            register.minDate.setFullYear(minyear);

            var maxyear = today.getFullYear() - 25;
            register.maxDate = new Date();
            register.maxDate.setFullYear(maxyear);

            register.open = function ($event) {
                register.opened = true;
                return true;
            };

		});
})();;
(function(){

	angular.module('QforQuants')
		.controller('queryController',function(categories,questionFormConfig,sessionService,toastr,queryService){
			var query = this;

			query.categories = categories;
			query.qModel     = questionFormConfig.Model;
			query.category   = null;

			query.qModel.userId     = sessionService.UserId;
			query.qModel.postDate   = new Date();
			query.qModel.lastModify = new Date();

			query.onClickSave = function(){
				if(!query.category){
					toastr.error('please select category');
					return;
				}

				query.qModel.catagoryId = query.category.catagoryId;

				var promise = queryService.SaveQuery(query.qModel);

				promise.then(function(result){
					toastr.success('Question Uploded Sucessfuly...');
					query.qModel = {};
				}).catch(function(error){
					toastr.error('Error in saving..');
					toastr.error(error);
				});
			};
		});
})();;
(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.NewQuery',{
				url          : 'question/query',
				templateUrl  : 'app/question/newQuery/query.html',
				controller   : 'queryController',
				controllerAs : 'query',
				resolve      : {
				  categories : function(categoryService){
					   return categoryService.GetAllCategory();
					}
				},
				authenticate : true,
				data         :{
               	  displayName: 'New Query'
                }
			});
		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('queryService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var saveQuery = function(model){
				var defered =  $q.defer();

				$http({
					method : 'POST',
					data   : model,
					url    : modelName + apiUri
				}).success(function(result){
					defered.resolve(result);
				}).error(function(error){
					defered.reject(error);
				});

				return defered.promise;
			};
			
			return{
				SaveQuery : saveQuery
			};

		});
})();;
(function(){

		angular.module('QforQuants')
			.controller('questionController',function($state){
			var question = this;
			question.searchText = '';

			question.onClickSearch = function(){
				if(question.searchText){
					$state.go('Home.Search',{ text : question.searchText});
				}
			};
		});
})();;
(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Question',{
				url          : 'question',
				templateUrl  : 'app/question/question.html',
				controller   : 'questionController',
				controllerAs : 'question',
				authenticate : true,
				data         :{
               	  displayName: 'Questions'
                }
			});
		});
})();;
(function(){

		angular.module('QforQuants')
			.controller('searchController',function(searchCount,searchList,searchText,searchService,$state){
			
			var search           = this;
			search.newSearchText = '';
			search.list          = searchList;
			search.count         = searchCount;
			search.searchText    = searchText;
			search.pages         = 0;
			search.firstPage     = 1;
			search.lastPage      = 0;
			search.currentPage   = 1;

			search.createPages = function(){

				var pageCount = search.count / 15;
				var range = [];
				for(var i = 0; i < pageCount ; i++) {
				  range.push( i+1 );
				}

				search.lastPage = range.length;
				return range;
			};

			search.pages = search.createPages();

			search.onClickPageButton = function(page){
				search.currentPage = page ; 

				var promise = searchService.SearchQuestions(search.searchText,page);

				promise.then(function(result){
					search.list = result;
				}).catch(function(error){
					toastr.error(error);
				});
			};

			search.onClickNextButton = function(){
				if(search.currentPage < search.lastPage){
					
					search.currentPage ++;
					var promise = searchService.SearchQuestions(search.searchText,search.currentPage);

					promise.then(function(result){
						search.list = result;
					}).catch(function(error){
						toastr.error(error);
					});
				}
			};

			search.onClickPrevButton = function(){
				if(search.currentPage > search.firstPage){
					
					search.currentPage --;

					var promise = searchService.SearchQuestions(search.searchText,search.currentPage);

					promise.then(function(result){
						search.list = result;
					}).catch(function(error){
						toastr.error(error);
					});
				}
			};

			search.onClickSearch = function(){
				if(search.newSearchText){
					$state.go('Home.Search',{ text : search.newSearchText});
				}
			};
		});
})();;
(function(){

	angular.module('QforQuants')
		.config(function($stateProvider){
			$stateProvider.state('Home.Search',{
				url          : 'question/search/:text',
				templateUrl  : 'app/question/search/search.html',
				controller   : 'searchController',
				controllerAs : 'search',
				resolve      : {
				searchCount  :  function($stateParams,searchService){
						return searchService.SearchCount($stateParams.text);
					},
				  searchList : function($stateParams,searchService){
						return searchService.SearchQuestions($stateParams.text,1);
					},
				 searchText  : function($stateParams){
						return $stateParams.text;
					}
				},
				authenticate :  true,
				data         :{
               	  displayName: 'Search'
                }
			});
		});
})();;
(function(){

	angular.module('QforQuants')
		.factory('searchService',function($http,$q){

			var modelName = 'question';
			var apiUri    = '/api/question';

			var searchQuestions = function(searchText,pageNumber){
				var deffered = $q.defer();
				var option = buildOptions(pageNumber);
				$http({
					method : 'GET',
					url    : modelName + '/textsearch' + apiUri + '/' + searchText,
					params : {options : option}
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};


			var searchCount = function(searchText){
				var deffered = $q.defer();

				$http({
					method : 'GET',
					url    : modelName + '/textsearchcount' + apiUri + '/' + searchText
				}).success(function(result){
					deffered.resolve(result);
				}).error(function(error){
					deffered.reject(error);
				});

				return deffered.promise;
			};
				
			var buildOptions = function(pageNumber){
				pageNumber = (pageNumber === 0) ? 0 : pageNumber - 1;

				var options = 'limit:20,skip:' + (20 * pageNumber);
				return options;
			};


			return{
				SearchQuestions : searchQuestions,
				SearchCount     : searchCount
			};

		});
})();;

(function(){
	angular.module('iq-ui')
		.directive('iqContactBox',function(){
			return {
				templateUrl : 'directives/iq-contactBox/iq-contactBox-tplt.html',
				restrict : 'AE',
				scope    :{
					config : '='
				},
				link     : function(scope, element, attrs){
					scope.users = scope.config;
				}
			};
		});
})();
;
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
;

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
;

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
					scope.getPlaceHolder = function(){
						return scope.config.Label;
					};
				}
			};
		});
})();



;
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
					scope.getPlaceHolder = function(){
						return scope.config.Label;
					};
				}
			};
		});
})();



;

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

			};
			
		});
})();


;

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



