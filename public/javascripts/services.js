angular.module('usys.services', [])
	.service('cdnPk',['$htto',function($http){
		var obj = {content:null};
		$http.post('/getCdn')
			.success(function(data,status,headers,config){
				obj.content = data;
			})
			.error(function(){

			});
		return obj;
	}]);
