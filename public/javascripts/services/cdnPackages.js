//------------------------------------------------------------------------------
//		This service calls to our node service which is going to reteive         |
//		the CDN object package and send it as json object to the client-side     |
//-----------------------------------------------------------------------------

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
