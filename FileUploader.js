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
		link : link,
		/*controller : ['$scope', function($scope) {
			$scope.disableUpload = true;
					
		}]*/
	}

	function link (scope, element, attrs) {
		// 默认上传文件按钮是enabled
		scope.disableUpload = false;
		scope.fileSizeExceed = false;

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
			defectFileSize(scope.fileUploader.queue, scope);
			var len = fileUploader.uploadedFiles.length;
			for (var i = 0; i < len; i++) {
				if (fileUploader.uploadedFiles[i].item.$$hashKey == item.$$hashKey) {
					fileUploader.uploadedFiles.splice(i,1);
				}
			}
		};

		fileUploader.onAfterAddingAll = function() {
			defectFileSize(scope.fileUploader.queue, scope);
		}
	}
	// 校验文件大小
	function defectFileSize(arr, scope) {
		var _len = arr ? arr.length : 0;
		if (_len > 0) {
			for (var i = 0; i < _len; i++) {
				var _tempFileSize = arr[i].file.size/1024/1024;
				if (_tempFileSize >= 10) {
					scope.fileSizeExceed = true;
					scope.disableUpload = true;
					break;
				} else {
					scope.fileSizeExceed = false;
				}
			}
		} else {
			scope.fileSizeExceed = false;
		}

		if (!scope.fileSizeExceed) {
			scope.disableUpload = false;
		}
	}


});