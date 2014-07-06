var app = angular.module('usys',[]);

app.controller('urlCTRL',function($scope,$http){
	$scope.validate = function(){
		$http({method:'POST',url:'/urlGetter',data:{url:$scope.url.text}})
				.success(function(data,status,headers,config){
					console.log('ok');
				})
				.error(function(data,status,headers,cnfig){
					console.log('Something is wrong');
				});
	};
});
