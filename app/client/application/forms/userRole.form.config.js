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

		})
})();