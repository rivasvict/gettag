angular.module('usys.controllers',[])
	.controller('urlCTRL',['$scope','$validator','$sce','$http','cdnObject',function($scope,$validator,$sce,$http,cdnObject){

	var jsT = {
		first : '<script type="text/javascript" src="',
		second:	'"></script>'
	};
	var cssT = {
		first : '<script type="text/css" rel="stylesheet" src="',
		second:	'" />'
	};

	if(!$scope.url){
		$scope.url = [{text:'',id:0,del:false,disabled:false,type:'',tag:'',blank:true}];
	}

	$scope.introduce = function(){
		$scope.url[$scope.url.length-1].blank = false;
	}

	$scope.cdnChose = function(pkg){

		if($scope.as===undefined) $scope.as = JSON.parse(cdnObject.content.body);

		if(pkg!==undefined){
			$scope.url[$scope.url.length-1].text = pkg+'';
			$scope.url[$scope.url.length-1].disabled = true;
			$scope.url[$scope.url.length-1].blank = false;
//-----------------SEPARATE THIS INTO A UNIKE FUNCTION
					var valid = $validator.urlC('ok',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text);
					if(valid !== false){
						$scope.url[$scope.url.length-1].disabled = true;
						$scope.url[$scope.url.length-1].type = valid[0];
						if(valid[0] === ".js"){
							$scope.url[$scope.url.length-1].tag = jsT.first + valid[1] + jsT.second;
						}else{
							$scope.url[$scope.url.length-1].tag = cssT.first + valid[1] + cssT.second;
						}
						$scope.url.push({text:$scope.url.text,id:$scope.url[$scope.url.length-1].id+1,del:false,disabled:false,blank:true});
					}
//---------------------------------------------------
		}

	}

	$scope.validate = function(){
	/*	console.log(cdnObject);
		$scope.as = JSON.parse(cdnObject.content.body);*/
		console.log($scope.as);
		$http({method:'POST',url:'/urlGetter',data:{url:$scope.url[$scope.url.length-1].text}})
				.success(function(data,status,headers,config){
					console.log('ok');
//-----------------SEPARATE THIS INTO A UNIKE FUNCTION
					var valid = $validator.urlC('ok',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text);
					if(valid !== false){
						$scope.url[$scope.url.length-1].disabled = true;
						$scope.url[$scope.url.length-1].type = valid[0];
						if(valid[0] === ".js"){
							$scope.url[$scope.url.length-1].tag = jsT.first + valid[1] + jsT.second;
						}else{
							$scope.url[$scope.url.length-1].tag = cssT.first + valid[1] + cssT.second;
						}
						$scope.url.push({text:$scope.url.text,id:$scope.url[$scope.url.length-1].id+1,del:false,disabled:false,blank:true});
					}
//---------------------------------------------------
				})
				.error(function(data,status,headers,cnfig){
					console.log('Something is wrong');
					if($scope.url[$scope.url.length-1].text===undefined){
						$scope.url = $scope.url.slice(0,$scope.url.length-1);
					}
					$validator.urlC('Not found',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text,$validator.eMessage.NotUrl);
				});

	};

/*	$scope.validate = function(){
		var action = $scope.check();
		if(action){
					console.log('ok');
					var valid = $validator.urlC('ok',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text);
					if(valid !== false){
						$scope.url[$scope.url.length-1].disabled = true;
						$scope.url[$scope.url.length-1].type = valid[0];
						if(valid[0] === ".js"){
							$scope.url[$scope.url.length-1].tag = jsT.first + valid[1] + jsT.second;
						}else{
							$scope.url[$scope.url.length-1].tag = cssT.first + valid[1] + cssT.second;
						}
						$scope.url.push({text:$scope.url.text,id:$scope.url[$scope.url.length-1].id+1,del:false,disabled:false});
					}

		}else{//console.log($scope.url[$scope.url.length-1].text);
					console.log('Something is wrong');
					if($scope.url[$scope.url.length-1].text===undefined){
						$scope.url = $scope.url.slice(0,$scope.url.length-1);
					}
					$validator.urlC('Not found',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text,$validator.eMessage.NotUrl);

		}
	}

	$scope.check = function(){
		var key = (+new Date) + "" + Math.random();
//		console.log($scope.url[$scope.url.length-1].text);
		$scope.urli = $sce.trustAsResourceUrl($scope.url[$scope.url.length-1].text);
		
		$('#ifr')[0].onload = function(){
			alert('passed');
		}console.log($('#ifr'));
			if($('#if').children!==undefined){
				console.log('asd');
			}else{console.log('sss');}
			var global = $('#ifr')[0].contentWindow;
			global[key] = "asd";
		if(global[key]==="asd"){
			return true;
		}else{
			return false;
		}
		try {
			var global = $('#ifr')[0].contentWindow;
			global[key] = "asd";
			return global[key] === "asd";
		}
		catch (e){
			return false;
		}
	};*/

/*	$scope.urli = "sadasant.com/js/Shade.js";
	$scope.urli = $sce.trustAsResourceUrl($scope.urli);*/

	$scope.delet = function(id){
		angular.forEach($scope.url,function(v,k){
			if(v.id === id) v.del = true;
		});
		var oldUrl = $scope.url;
		$scope.url = [];
		angular.forEach(oldUrl,function(v,k){
			if(!v.del) $scope.url.push(v);
		});
	};
	
	}]);
