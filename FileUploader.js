/**
 * [description]
 * @author wangdi
 * @date   2016-12-01
 * @param  {[type]}   ) {}          [description]
 * @return {[type]}     [description]
 */
app.directive('fileUploaderDirective',  function() {
	return {
		restrict : 'EA',
		replace : true,
		templateUrl : 'js/directives/file-uploader/file_uploader_directive.html',
		scope: {
			'displaytext' : '@displaytext',
			'accesstoken' : '@',
			'multipletype' : '@',
			'fileUploader' : '=uploader',
			'type':'&'
		},
		link : link
	}

	function link (scope, element, attrs) {
		var fileUploader = scope.fileUploader;
		fileUploader.uploadedFiles = [];
		scope.upload=function(){
			// 上传文件
			fileUploader.onBeforeUploadItem = function(item) {
				item.formData=[{
					"accesstoken": scope.accesstoken,
					"type" : fileUploader.type,
				}];
			};
			fileUploader.onSuccessItem = function(item, response, status, headers) {
				fileUploader.uploadedFiles.push({item : item, url : response.data});
			};

			// 判断文件是否上传完成
			if (fileUploader.queue.length > 0) {
				fileUploader.uploadAll();
			}
		};
		scope.removeFile = function(item) {
			item.remove();
			var len = fileUploader.uploadedFiles.length;
			for (var i = 0; i < len; i++) {
				if (fileUploader.uploadedFiles[i].item.$$hashKey == item.$$hashKey) {
					fileUploader.uploadedFiles.splice(i,1);
				}
			}
		};
	}


});