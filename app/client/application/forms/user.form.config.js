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
})();