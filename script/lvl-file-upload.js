angular
	.module("lvl.directives.fileupload", ['lvl.services'])
	.directive('lvlFileUpload', ['$timeout', 'uuid', 'fileUploader', function($timeout, uuid, fileUploader) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				chooseFileButtonText: '@',
				uploadFileButtonText: '@',
				uploadUrl: '@',
				maxFiles: '@',
				maxFileSizeMb: '@',
				autoStart: '@',
				beforeStart: '&',
				onProgress: '&',
				onDone: '&',
				onError: '&'
			},
			template: '<span>' + 
						'<input type="file" style="opacity:0" />' +
						'<label class="lvl-choose-button" ng-click="choose()">{{chooseFileButtonText}}</label>' +
						'<span class="lvl-upload-button" ng-show="showUploadButton" ng-click="upload()">{{uploadFileButtonText}}</span>' +
					  '</span>',
			compile: function compile(tElement, tAttrs, transclude) {
				var fileInput = angular.element(tElement.children()[0]);
				var fileLabel = angular.element(tElement.children()[1]);

				if (!tAttrs.maxFiles) {
					tAttrs.maxFiles = 1;
					fileInput.removeAttr("multiple")
				} else {
					fileInput.attr("multiple", "multiple");
				}

				if (!tAttrs.maxFileSizeMb) {
					tAttrs.maxFileSizeMb = 50;
				}

				var fileId = uuid.new();
				fileInput.attr("id", fileId);
				fileLabel.attr("for", fileId);

				return function postLink(scope, el, attrs, ctl) {
					scope.files = [];
					scope.showUploadButton = false;

					el.bind('change', function(e) {
						if (!e.target.files.length) return;

						scope.files = [];
						var tooBig = [];
						if (e.target.files.length > scope.maxFiles) {
							raiseError(e.target.files, 'TOO_MANY_FILES', "Cannot upload " + e.target.files.length + " files, maxium allowed is " + scope.maxFiles);
							return;
						}

						for (var i = 0; i < scope.maxFiles; i++) {
							if (i >= e.target.files.length) break;

							var file = e.target.files[i];
							scope.files.push(file);

							if (file.size > scope.maxFileSizeMb * 1048576) {
								tooBig.push(file);
							}
						}

						if (tooBig.length > 0) {
							raiseError(tooBig, 'UPLOAD_MAX_EXCEEDED', "Files are larger than the specified max (" + scope.maxFileSizeMb + "MB)");
							return;
						}

						if (scope.autoStart) {
							scope.upload();
						} else {
							scope.$apply(function() {
								scope.showUploadButton = true;
							})
						}
					});

					scope.upload = function() {
						if (scope.beforeStart && !scope.beforeStart({files: scope.files})) {
							return;
						}

						fileUploader
							.post(scope.files)
							.to(scope.uploadUrl)
							.then(function(data) {
								scope.onDone({files: data});
							}, function(error) {
								scope.onError({files: scope.files, type: 'UPLOAD_ERROR', msg: error});
							},  function(progress) {
								scope.onProgress({percentDone: progress});
							});

						resetFileInput();
					};

					function raiseError(files, type, msg) {
						scope.onError({files: files, type: type, msg: msg});
						resetFileInput();
					}

					function resetFileInput() {
						var parent = fileInput.parent();

						fileInput.remove();
						var input = document.createElement("input");
						var attr = document.createAttribute("type");
						attr.nodeValue = "file";
						input.setAttributeNode(attr);

						var inputId = uuid.new();
						attr = document.createAttribute("id");
						attr.nodeValue = inputId;
						input.setAttributeNode(attr);

						attr = document.createAttribute("style");
						attr.nodeValue = "opacity: 0";
						input.setAttributeNode(attr);

						if (scope.maxFiles > 1) {
							attr = document.createAttribute("multiple");
							attr.nodeValue = "multiple";
							input.setAttributeNode(attr);
						}

						fileLabel.after(input);
						fileLabel.attr("for", inputId);

						fileInput = angular.element(input);
					}
				}
			}
		}
	}]);