angular
	.module('lvl.directives', ['lvl.services'])
	.directive('lvlDropTarget', function($rootScope, uuid) {
	    return {
	        restrict: 'A',
	        scope: {
	            dropped: '&'
	        },
	        link: function(scope, el, attrs, controller) {
	            angular.element(el).attr("draggable", "true");
	            var id = attrs.id;
	            if (!attrs.id) {
	                id = uuid.new()
	                angular.element(el).attr("id", id);
	            }
	                       
	            el.bind("dragover", function(e) {
	              if (e.preventDefault) {
	                e.preventDefault(); // Necessary. Allows us to drop.
	              }
	              
	              e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
	              return false;
	            });
	            
	            el.bind("dragenter", function(e) {
	              // this / e.target is the current hover target.
	              angular.element(e.target).addClass('lvl-over');
	            });
	            
	            el.bind("dragleave", function(e) {
	              angular.element(e.target).removeClass('lvl-over');  // this / e.target is previous target element.
	            });
	            
	            el.bind("drop", function(e) {
	                var dest = document.getElementById(id);
	                var src = document.getElementById(e.dataTransfer.getData("text/plain"));
	                
	                scope.dropped({dragEl: src, dropEl: dest});
	            });
	            
	            $rootScope.$on("LVL-DRAG-START", function() {
	                var el = document.getElementById(id);
	                angular.element(el).addClass("lvl-target");
	            });
	            
	            $rootScope.$on("LVL-DRAG-END", function() {
	                var el = document.getElementById(id);
	                angular.element(el).removeClass("lvl-target");
	                angular.element(el).removeClass("lvl-over");
	            });
	        }
    	}
	});
