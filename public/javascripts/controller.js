var app = angular.module('usys',[]);

app.service('$validator',function(){

	this.urlC = function(status,errTarget){
		if(status === 'ok'){
			$('.error').hide();
			return true;
		}else{console.log(errTarget);
			errTarget = errTarget.toString();
			$('#'+errTarget+'.error').show();
			return false;
		}
	}

});

app.controller('urlCTRL',function($scope,$http,$validator){
	if(!$scope.url){
		$scope.url = [{text:'',id:0}];
	}
	$scope.validate = function(){
		$http({method:'POST',url:'/urlGetter',data:{url:$scope.url[$scope.url.length-1].text}})
				.success(function(data,status,headers,config){
					console.log('ok');
					$validator.urlC('ok');
					$scope.url.push({text:$scope.url.text,id:$scope.url[$scope.url.length-1].id+1});
				})
				.error(function(data,status,headers,cnfig){
					console.log('Something is wrong');
					if($scope.url[$scope.url.length-1].text !== undefined){
						$scope.url = $scope.url.slice(0,$scope.url.length-1);
					}
					$validator.urlC('Not found',$scope.url[$scope.url.length-1].id);
				});
	};
});
