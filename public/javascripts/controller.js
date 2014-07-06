var app = angular.module('usys',[]);

app.service('$validator',function(){

	this.urlC = function(status){
		if(status === 'ok'){
			$('.error').hide();
			return true;
		}else{
			$('.error').show();
			return false;
		}
	}

});

app.controller('urlCTRL',function($scope,$http,$validator){
	if(!$scope.url){
		$scope.url = [{text:''}];
	}
	$scope.validate = function(){
		$http({method:'POST',url:'/urlGetter',data:{url:$scope.url[$scope.url.length-1].text}})
				.success(function(data,status,headers,config){
					console.log('ok');
					$validator.urlC('ok');
					$scope.url.push({text:$scope.url.text});
				})
				.error(function(data,status,headers,cnfig){
					console.log('Something is wrong');
					$validator.urlC('Not found');
				});
	};
});
