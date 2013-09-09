var module;

try {
    module = angular.module('lvl.services');  
} catch (e) {
    module  = angular.module('lvl.services', []);
}

module.factory('fileUploader', ['$rootScope', '$q', function($rootScope, $q) {
	var svc = {
		post: function(files) {

			return {
				to: function(uploadUrl) 
				{
					var deferred = $q.defer()
					if (!files || !files.length) {
						deferred.reject("No files to upload");
						return;
					}

					var xhr = new XMLHttpRequest();
					xhr.upload.onprogress = function(e) {
						$rootScope.$apply (function() {
							var percentCompleted;
						    if (e.lengthComputable) {
						        percentCompleted = Math.round(e.loaded / e.total * 100);
						        deferred.notify(percentCompleted);
						    }
						});
					};

					xhr.upload.onload = function(e) {
						console.log(JSON.stringify(e));
						$rootScope.$apply (function() {
							deferred.resolve(files);
						})
					};

					xhr.upload.onerror = function(e) {
						var msg = xhr.responseText ? xhr.responseText : "An unknown error occurred posting to '" + uploadUrl + "'";
						$rootScope.$apply (function() {
							deferred.reject(msg);
						});
					}

					xhr.onreadystatechange == function() {
						console.log("xhr.readystate: " + xhr.readystate);
						console.log("xhr.status : " + xhr.status);
						console.log("xhr.responseText : " + xhr.responseText);
					}

					var formData = new FormData();
					for (var idx = 0; idx < files.length; idx++) {
						formData.append("files[]", files[idx]);
					}

					xhr.open("POST", uploadUrl);
					xhr.send(formData);

					return deferred.promise;				
				}
			};
		}
	};

	return svc;
}]);