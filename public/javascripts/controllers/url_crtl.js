angular.module('usys.controllers',[])
	.controller('urlCTRL',['$scope','$validator','$sce','$http','cdnObject',function($scope,$validator,$sce,$http,cdnObject){

	var css_clip = new ZeroClipboard($('button#css-button'));
	var js_clip = new ZeroClipboard($('button#js-button'));

	css_clip.on('copy',function(event){
		var clipboard = event.clipboardData;
		var css_tag = '';
		angular.forEach($scope.url,function(v,k){
			if(v.csst!==null){
				css_tag+=v.tag;
			}
		});
		css_tag = '<head>'+css_tag+'</head>';
		clipboard.setData('text/plain',css_tag);
		alert('Copied!');
	});

	js_clip.on('copy',function(event){
		var clipboard = event.clipboardData;
		var js_tag = '';
		angular.forEach($scope.url,function(v,k){
			if(v.jst!==null){
				js_tag+=v.tag;
			}
		});
		clipboard.setData('text/plain',js_tag);
		alert('Copied!');
	});


	var jsT = {
		first : '<script type="text/javascript" src="',
		second:	'"></script>'
	};
	var cssT = {
		first : '<link type="text/css" rel="stylesheet" src="',
		second:	'" />'
	};

	if(!$scope.url){
		$scope.url = [{text:'',id:0,del:false,disabled:false,type:'',tag:'',blank:true,jst:null,csst:null}];
	}

	$scope.introduce = function(){
		$scope.url[$scope.url.length-1].blank = false;
		$scope.pkg = true;
	}

	$scope.cancel_insert = function(){
		$scope.url[$scope.url.length-1].blank = true;
		$scope.cancel_cdn();
	}

	$scope.cancel_cdn = function(){
		$scope.as = undefined;
		$scope.pkgs = '';
		$scope.pkg = true;
	}

	$scope.pkg = true;

	$scope.vl = function(){
		var valid = $validator.urlC('ok',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text);
		if(valid !== false){
			$scope.url[$scope.url.length-1].disabled = true;
			$scope.url[$scope.url.length-1].type = valid[0];
			if(valid[0] === ".js"){
				$scope.url[$scope.url.length-1].tag = jsT.first + valid[1] + jsT.second;
				$scope.url[$scope.url.length-1].jst = true;
			}else{
				$scope.url[$scope.url.length-1].tag = cssT.first + valid[1] + cssT.second;
				$scope.url[$scope.url.length-1].csst = true;
			}
			$scope.url.push({text:$scope.url.text,id:$scope.url[$scope.url.length-1].id+1,del:false,disabled:false,blank:true,csst:null,jst:null});
		}
	}

	$scope.cdnChose = function(pkg){

		if($scope.as===undefined){
 			$scope.as = JSON.parse(cdnObject.content.body);
			$scope.pkg = false;
		}		

		if(pkg!==undefined){
			$scope.url[$scope.url.length-1].text = pkg+'';
			$scope.url[$scope.url.length-1].disabled = true;
			$scope.url[$scope.url.length-1].blank = false;
			$scope.vl();
			//-------Configuring views to defaults---------
			$scope.cancel_cdn();
		}

	}

	$scope.validate = function(){
	/*	console.log(cdnObject);
		$scope.as = JSON.parse(cdnObject.content.body);*/
		console.log($scope.as);
		$http({method:'POST',url:'/urlGetter',data:{url:$scope.url[$scope.url.length-1].text}})
				.success(function(data,status,headers,config){
					console.log('ok');
					$scope.vl();
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
