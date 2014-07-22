angular.module('usys.services_more',[])
	.service('$validator',function(){

	this.eMessage = {
		invalidFile	: "This is not a js or css file",
		NotUrl			:	"Invalid url",
		NoConnection: "Check your Internet's connection"
	};

	this.fileId = function(url){
		this.stringsV = [{finder	:	".js"},{finder:	".css"}]
		var ret = false;
		var tru = -1;
		angular.forEach(this.stringsV,function(v,k){
			tru = url.indexOf(v.finder);
			if(tru > 0){
				ret = v.finder;
				slash = url.lastIndexOf("/");
				slic = url.slice(slash+1,url.length);
			}
		});
		if(ret !== false){
			return [ret,slic];
		}else{
			return false;
		}
	}

	this.urlC = function(status,errTarget,url,eMessage){
		if(status === 'ok'){
			var fType = this.fileId(url);
			$('.error').hide();
			if(fType === false){
				this.urlC("Something is wrong",errTarget,url,this.eMessage.invalidFile);
				return false;
			}else{
				return fType;
			}
		}else{
			errTarget = errTarget.toString();
			$('#'+errTarget+'.error').text(eMessage).show();
			return false;
		}
	}


	});
