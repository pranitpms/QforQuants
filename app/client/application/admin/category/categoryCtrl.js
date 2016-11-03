(function(){

	angular.module('QforQuants')
		.controller('categoryController',function(categories,categoryFormConfig,categoryService,toastr){

			var category = this;
			var model    = categoryFormConfig.Model;
			category.config = {
				columns:[]
			}

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
			}

			category.addObject = function(){
			var promise = categoryService.SaveCategory(category.instance);

			promise.then(function(result){
				toastr.success('Record Saved Successfuly!!!')
				category.dataList.push(result);
			}).catch(function(error){
				toastr.error(error);
				console.log(error);
			});
		};


		category.updateObject = function(data){
			var promise = categoryService.UpdateCategory(data,data._id);

			promise.then(function(result){
				toastr.success('Record Updated Successfuly!!!')
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
				toastr.success('Record Deleted Successfuly!!!')
				var index = _.findIndex(category.dataList,function(cat){
					return cat.categoryId === result.categoryId;
				});
                category.dataList.splice(index, 1);
			}).catch(function(error){
				toastr.error(error);
				console.log(error);
			});
		};
		})
})();