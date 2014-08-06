angular.module('usys.directives',[])
/*	.directive('fileread',function(){
		return {
			scope:{
				fileread: "="
			},
			link:function(scope,element,attributes){
				element.bind("change",function(changeEvent){
					var reader = new FileReader();
					reader.onload = function(loadEvent){
						scope.$apply(function(){
							scope.fileread = loadEvent.target.result;
						});
					}
					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		};
	});*/

.directive("fileread", [function () {
	return {
		scope: {
			fileread: "=",
			upload:	"&"
		},
		link: function (scope, element, attributes) {
			element.bind("change", function (changeEvent) {
				scope.$apply(function () {
					scope.fileread = changeEvent.target.files[0].name;
				});
				scope.$apply(attributes.upload);
			});
		}
	}
}]);
