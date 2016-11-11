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

		})
})();