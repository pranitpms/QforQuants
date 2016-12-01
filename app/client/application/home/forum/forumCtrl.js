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
})();