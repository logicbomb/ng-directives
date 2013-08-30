angular
	.module("lvl.directives", ['lvl.services'])
	.directive('lvlDraggable', function(uuid, $rootScope) {
	    return {
	        restrict: 'A',
	        link: function(scope, el, attrs, controller) {
	        	console.log("linking draggable element");

	            angular.element(el).attr("draggable", "true");
	            var id = attrs.id;
	            if (!attrs.id) {
	                id = uuid.new()
	                angular.element(el).attr("id", id);
	            }
	            
	            el.bind("dragstart", function(e) {
	                e.dataTransfer.setData('text/plain', id);
	                $rootScope.$emit("LVL-DRAG-START");
	            });
	            
	            el.bind("dragend", function(e) {
	                $rootScope.$emit("LVL-DRAG-END");
	            });
	        }
    	}
	});