(function(){

	angular.module('QforQuants')
		.controller('forumviewController',function(questionDetails,replies,forumviewService,sessionService,toastr){
			var forumview = this;
		
			forumview.questionDetails = questionDetails;
			forumview.replies         = replies;

			forumview.model = {};

			var initModel = function(){
				forumview.model = {
					replyId    : 0,
					reply      : '',
					questionId : forumview.questionDetails.questionId,
					userId     : sessionService.UserId,
					_user      : sessionService.User._id,
					rate       : 0,
					lastModify : ''
				}
			};

			
			initModel();

			forumview.onClickSave = function(){
				
				forumview.model.lastModify = new Date();

				var promise = forumviewService.SaveReply(forumview.model);

				promise.then(function(result){
					toastr.success('Reply Added successfuly...!');
					forumview.replies.push(result);
					initModel();
				}).catch(function(error){
					toastr.error(error);
				});
			};

			 

		});
})();