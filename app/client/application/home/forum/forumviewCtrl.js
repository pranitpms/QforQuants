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
				}
			};

		//	var setOldValue = 
			
			initModel();

			forumview.onClickSave = function(){
				
				if(!sessionService.IsAuthenticated){
					toastr.warning('to post your reply.. please login first...');
					return;
				}

				forumview.model.lastModify = new Date();
				forumview.model.userId = sessionService.UserId
				forumview.model._user  = sessionService.User._id

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
			 	 	case 1 :  (replyObj.rate_1)  ? replyObj.rate_1 = replyObj.rate_1 + 1 : replyObj.rate_1 = 1 ;
			 	 			  break;
			 	 	case 2 :  (replyObj.rate_2)  ? replyObj.rate_2 = replyObj.rate_2 + 1 : replyObj.rate_2 = 1 ;
			 	 			  break;
			 	 	case 3 :  (replyObj.rate_3)  ? replyObj.rate_3 = replyObj.rate_3 + 1 : replyObj.rate_3 = 1 ;
			 	 			  break;
			 	 	case 4 :  (replyObj.rate_4)  ? replyObj.rate_4 = replyObj.rate_4 + 1 : replyObj.rate_4 = 1 ;
			 	 			  break;
			 	 	case 5 :  (replyObj.rate_5)  ? replyObj.rate_5 = replyObj.rate_5 + 1 : replyObj.rate_5 = 1 ;
			 	 			  break;
			 	 }
			 };
		});
})();