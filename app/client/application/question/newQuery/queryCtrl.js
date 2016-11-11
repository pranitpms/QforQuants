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
		})
})();