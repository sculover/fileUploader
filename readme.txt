需要在index.html里面引入
<script src="libs/angular/angular-file-upload/angular-file-upload.js"></script>
并在app.js里面注入 angularFileUpload

---控制器---
注入FileUploader指令
app.controller('TestController',
	['FileUploader',function(FileUploader){
	...
	}]}
var uploadPath = $window.platformServer + 'common/commons/common-upload?accesstoken=' + $scope.accesstoken;
			var protocolUploader =  $scope.protocolUploader = new FileUploader({
				url: uploadPath
			});
//配置文件上传指令
$scope.fileUploaderConfigure = {
	'accesstoken' : $scope.accesstoken,
	'type' : 18,
	'buttonClass' : 'col-sm-3 text-right',
	'fileSelectClass' : 'col-sm-9 m-b',
	'displaytext' : '浏览',
	'accept' : '', // 文件 '', 图片 'image/*'
}
---html---
<div file-uploader-directive uploader="protocolUploader" configure="fileUploaderConfigure"></div>
----输出---
上传的文件在protocolUploader.uploadedFiles里面


TODO: controle file multiple select

