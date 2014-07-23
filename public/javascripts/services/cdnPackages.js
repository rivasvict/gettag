angular.module('usys.services',[]).
	factory('cdnObject',function($http){
		var obj = {
			content:null
		};
		$http.post('/getCdn')
			.success(function(data,status,headers,config){
				obj.content = data;
			})
			.error();
		return obj;
	});
