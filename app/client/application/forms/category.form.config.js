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
})();