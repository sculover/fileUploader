---控制器---
var testUploader = $scope.testUploader = new FileUploader({
	url: approvalUploadPath
});
$scope.testUploader.type = '18';
---html---
<div file-uploader-directive displaytext="浏览" uploader="testUploader"></div>

上传的文件在testUploader.uploadedFiles里面

