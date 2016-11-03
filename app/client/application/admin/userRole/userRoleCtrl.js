(function(){

	angular.module('QforQuants')
		.controller('userRoleController',function(userRoleList,userRoleFormConfig,userRoleService){

		var role   = this;
		var model    = userRoleFormConfig.Model;
		
		role.config = {columns:[]}
		role.dataList = userRoleList || [];
		role.instance = angular.copy(model);
		role.addMode  = false;

		role.config.columns = userRoleFormConfig.GetFormData();
		
		role.toggleAddMode = function(){
				role.addMode = !role.addMode;
				role.instance = angular.copy(model);
			};

		role.toggleEditMode = function(data){
			data.editMode = !data.editMode;
		};

		role.addObject = function(){
			var promise = userRoleService.SaveRole(role.instance);

			promise.then(function(result){
				role.dataList.push(result);
			}).catch(function(error){
				console.log(error);
			});
		};


		role.updateObject = function(data){
			var promise = userRoleService.UpdateRole(data,data._id);

			promise.then(function(result){
				var index = _.findIndex(role.dataList,function(role){
					return role.roleId === result.roleId;
				});
                role.dataList[index] = result;
			}).catch(function(error){
				console.log(error);
			});
		};

		role.deleteObject = function(data){
			var promise = userRoleService.DeleteRole(data._id);

			promise.then(function(result){
				var index = _.findIndex(role.dataList,function(role){
					return role.roleId === result.roleId;
				});
                role.dataList.splice(index, 1);
			}).catch(function(error){
				console.log(error);
			});
		};

	});
})();