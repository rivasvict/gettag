angular.module('usys.controllers',[])
	.controller('urlCTRL',['$scope','$validator','$sce','$http','cdnObject',function($scope,$validator,$sce,$http,cdnObject){

	$scope.local_remote = {
		url:false,
		path:true,
		place:'local',
		opp:'remote'
	}
	$scope.path_changer = function(){
		if($scope.local_remote.place==='local'){
			angular.forEach($scope.url,function(v,k){
				if(v.csst===true){
					v.tag = tags(v,44,4,'css','tag',true);
					v.jtag = tags(v,43,2,'css','jtag',true);
				}else{
					v.tag = tags(v,36,11,'js','tag',true);
					v.jtag = tags(v,35,2,'js','jtag',true);
				}
			});
			$scope.local_remote.url = true;
			$scope.local_remote.path = false;
			$scope.local_remote.place = 'remote';
			$scope.local_remote.opp = 'local';
		}else{
			angular.forEach($scope.url,function(v,k){
				if(v.csst===true){
					v.tag = tags(v,44,4,'css','tag');
					v.jtag = tags(v,43,2,'css','jtag');
				}else{
					v.tag = tags(v,36,11,'js','tag');
					v.jtag = tags(v,35,2,'js','jtag');
				}
			});
			$scope.local_remote.url = false;
			$scope.local_remote.path = true;
			$scope.local_remote.place = 'local';
			$scope.local_remote.opp = 'remote';
		}
	}

	$scope.template = {name:'html',opp:'jade',html:true,jade:false};
	$scope.template_s = function(){
		if($scope.template.name === 'html'){
			$scope.template.name = 'jade';
			$scope.template.opp = 'html';
			$scope.template.html = false;
			$scope.template.jade = true;
		}else{
			$scope.template.name = 'html';
			$scope.template.opp = 'jade';
			$scope.template.html = true;
			$scope.template.jade = false;
		}
	}

//-------------CLIPBOARD AREA--------------
	var css_clip = new ZeroClipboard($('button#css-button'));
	var js_clip = new ZeroClipboard($('button#js-button'));
	var w_css_clip = new ZeroClipboard($('button#wgetc-button'));
	var w_js_clip = new ZeroClipboard($('button#wgetj-button'));

	css_clip.on('copy',function(event){
		var clipboard = event.clipboardData;
		var css_tag = '';
		angular.forEach($scope.url,function(v,k){
			if(v.csst!==false){
				if($scope.template.name==='html'){
					css_tag+='\t'+v.tag+'\n';
				}else{
					css_tag+='\t'+v.jtag+'\n';
				}
			}
		});
		if($scope.template.name==='html'){
			css_tag = '<head>\n'+css_tag+'</head>';
		}else{
			css_tag = 'head\n'+css_tag;
		}
		clipboard.setData('text/plain',css_tag);
		alert('Copied!');
	});

	js_clip.on('copy',function(event){
		var clipboard = event.clipboardData;
		var js_tag = '';
		angular.forEach($scope.url,function(v,k){
			if(v.jst!==false){
				if($scope.template.name==='html'){
					js_tag+=v.tag+'\n';
				}else{
					js_tag+=v.jtag+'\n';
				}
			}
		});
		clipboard.setData('text/plain',js_tag);
		alert('Copied!');
	});
	w_js_clip.on('copy',function(event){
		alert('Copied!');
	});
	w_css_clip.on('copy',function(event){
		alert('Copied!');
	});



//----------------------------------------

	$scope.path = {
		css:'',
		js:''
	}

	var tags = function(v,n_first,n_second,fn,pointer,remote){
		var first = v[pointer].slice(0,n_first);
		var second =  v[pointer].slice(v[pointer].length-n_second,v[pointer].length);
		var package = v.pkg_name;
		if(remote!==undefined){
			var path = v.url_path;
		}else{
			var path = $scope.path[fn];
		}
		v[pointer] = '';
		v[pointer] = first + path + package + second;
		return v[pointer];
	}

	$scope.pathc = function(){
		angular.forEach($scope.url,function(v,k){
			if($scope.local_remote.place==='local'){
				if(v.csst!==false){
					v.tag = tags(v,44,4,'css','tag');
					v.jtag = tags(v,43,2,'css','jtag');
				}else if(v.jst!==false){
					v.tag = tags(v,36,11,'js','tag');
					v.jtag = tags(v,35,2,'js','jtag');
				}
			}else{
			}
		});
	}

	if(!$scope.url){
		$scope.url = [{
			text:'',
			id:0,
			del:false,
			disabled:false,
			type:'',
			tag:'',
			jtag:'',
			blank:true,
			jst:false,
			csst:false,
			pkg_name:'',
			url_path:'',
			remote:null
		}];
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

	$scope.tagBuilder = function(url){
		if(url!==undefined){
			var fpathjs = url;
			var fpathcss = url;
		}else{
			var fpathjs = $scope.path.js;
			var fpathcss = $scope.path.css;
		}
		var jsT = {
			first : '<script type="text/javascript" src="' + fpathjs,
			second:	'"></script>'
		};
		var cssT = {
			first : '<link type="text/css" rel="stylesheet" src="' + fpathcss,
			second:	'" />'
		};
		var jjsT = {
			first : 'script(type="text/javascript",src="' + fpathjs,
			second:	'")'
		}
		var jcssT = {
			first : 'link(type="text/css",rel="stylesheet",src="' + fpathcss,
			second:	'")'
		}
		return {js:jsT,css:cssT,jjs:jjsT,jcss:jcssT};
	}

	$scope.vl = function(){
		var valid = $validator.urlC('ok',$scope.url[$scope.url.length-1].id,$scope.url[$scope.url.length-1].text);
		if(valid !== false){
			$scope.url[$scope.url.length-1].disabled = true;
			$scope.url[$scope.url.length-1].type = valid[0];
			var name = $validator.fileId($scope.url[$scope.url.length-1].text);
			$scope.url[$scope.url.length-1].pkg_name = name[1];
			if(valid[0] === ".js"){
				if($scope.local_remote.path===true){
					jsT = $scope.tagBuilder();
				}else{
					jsT = $scope.tagBuilder($scope.url[$scope.url.length-1].url_path);
				}
				jade_js = jsT.jjs;
				jsT = jsT.js;
				$scope.url[$scope.url.length-1].tag = jsT.first + valid[1] + jsT.second;
				$scope.url[$scope.url.length-1].jtag = jade_js.first + valid[1] + jade_js.second;
				$scope.url[$scope.url.length-1].jst = true;
			}else{
				if($scope.local_remote.path===true){
					cssT = $scope.tagBuilder();
				}else{
					cssT = $scope.tagBuilder($scope.url[$scope.url.length-1].url_path);	
				}
				jade_css = cssT.jcss;
				cssT = cssT.css;
				$scope.url[$scope.url.length-1].tag = cssT.first + valid[1] + cssT.second;
				$scope.url[$scope.url.length-1].jtag = jade_css.first + valid[1] + jade_css.second;
				$scope.url[$scope.url.length-1].csst = true;
			}
			$scope.url.push({
				text:$scope.url.text,
				id:$scope.url[$scope.url.length-1].id+1,
				del:false,
				disabled:false,
				blank:true,
				csst:false,
				jst:false,
				pkg_name:'',
				tag:'',
				jtag:'',
				url_path:'',
				remote:null
			});
		}
	}

	$scope.cdnChose = function(pkg,name){

		if($scope.as===undefined){
 			$scope.as = JSON.parse(cdnObject.content.body);
			$scope.pkg = false;
		}		

		if(pkg!==undefined){
			$scope.url[$scope.url.length-1].text = pkg+'';
			$scope.url[$scope.url.length-1].disabled = true;
			$scope.url[$scope.url.length-1].blank = false;
			$scope.url[$scope.url.length-1].pkg_name = name;
			$scope.url[$scope.url.length-1].remote = true;
			upath = $validator.fileId(pkg);
			$scope.url[$scope.url.length-1].url_path = upath[2];
			$scope.vl();
			//-------Configuring views to defaults---------
			$scope.cancel_cdn();
		}

	}

	$scope.validate = function(){
	/*	console.log(cdnObject);
		$scope.as = JSON.parse(cdnObject.content.body);*/
		$http({method:'POST',url:'/urlGetter',data:{url:$scope.url[$scope.url.length-1].text}})
				.success(function(data,status,headers,config){
					console.log('ok');
					upath = $validator.fileId($scope.url[$scope.url.length-1].text);
					$scope.url[$scope.url.length-1].url_path = upath[2];
					$scope.url[$scope.url.length-1].remote = true;
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
