(function(){

	angular.module('QforQuants')
		.controller('forumController',function(questions,count,forumService){
			var element = angular.element($('#homeDiv'));
				if(element[0].hidden){
					element[0].hidden = false;
				};


			var forum = this;
			forum.count = count || 0;
			forum.questions = questions;
			forum.firstPage = 1;
			forum.lastPage  = count;
			forum.currentPage = 1;

			forum.onClickPageButton = function(page){
				forum.currentPage = page;
				forum.questions = forumService.GetAllQuestions(forum.currentPage,null,null);
			}

			forum.onClickNextButton = function(){
				if(forum.currentPage > forum.lastPage){
					forum.currentPage ++;
					forum.questions = forumService.GetAllQuestions(forum.currentPage,null,null);
				}
			};

			forum.onClickPrevButton = function(){
				if(forum.currentPage < forum.firstPage){
					forum.currentPage --;
					forum.questions = forumService.GetAllQuestions(forum.currentPage,null,null);
				}
			}

		});
})();