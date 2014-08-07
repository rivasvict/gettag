//----------------------------------------------------
//					Service for local validation							|
//----------------------------------------------------


angular.module('usys.services_more',[])
	.service('$validator',function(){


//----------Error messages set
	this.eMessage = {
		invalidFile	: "This is not a js or css file",
		NotUrl			:	"Invalid url",
		NoConnection: "Check your Internet's connection"
	};
//--------------------------------------------------


//----------It returns the name and url in separate elements of an array if the file has a js or css extension, if not
//----------it will return false
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
				upath = url.slice(0,slash+1);
			}
		});
		if(ret !== false){
			return [ret,slic,upath];
		}else{
			return false;
		}
	}
//------------------------------------------------------


//------------It returns the same array as fileId function but when there is no js or css extension it returns false and
//------------an error message choosen by the developer
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
//------------------------------------------------------------------------------

	});
