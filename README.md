Angular Directives and Services
=============

UUID Service
------------
A very simple service for working with [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

Operations:
+ uuid.new() - generates a new UUID based on the code found here: http://stackoverflow.com/a/16693578
+ uuid.empty() - get's an empty UUID ('00000000-0000-0000-0000-000000000000') 

Usage:
 1. download the file [lvl-uuid.js](https://raw.github.com/logicbomb/ng-directives/master/src/script/lvl-uuid.js)
 2. include it in your html
 3. inject it into your angular controller

[Live Demo](http://logicbomb.github.io/ng-directives/uuid.html)

```html
	<!-- this line is included before your angular application script -->
	<!-- the src path is specific to your project -->
	<script src="/scripts/angular/lvl-uuid.js"></script>
```
```javascript
	angular
		.module('myApplication', ['lvl.services']) //register the factory with your module
		.controller('myController', ['$scope', 'uuid', function($scope, uuid) { 
		//inject the service into your application
			var newUuid = uuid.new(); //use the service
			var emptyUuid = uuid.empty(); //use the service
		}]);

```

Drag-Drop Directive
-------------------
An easy to use, native, directive to enable drag/drop in your angular app.  This directive has no dependency on jQuery or other frameworks, it does require a browser that supports the HTML5 drag/drop events.

[Live Demo](http://logicbomb.github.io/ng-directives/drag-drop.html)

###Drag attribute###
*x-lvl-draggable='true'*

```html
<style>
	[draggable] {
		cursor: move; //make it obvious which elements are draggable
	}
</style>
<div x-lvl-draggable='true'>Drag me!</div>
```

###Drop attributes###
*x-lvl-drop-target='true'*

*x-lvl-on-drop=dropFunction(dragEl, dropEl)*  
Specifies the callback to be called when an element is dropped on the target.  The directive calls the function with the raw DOM elements as parameters.

```html
<div x-lvl-drop-target='true' x-lvl-on-drop='dropped(dragEl, dropEl)' class='drop-target'></div>
```

```javascript
//this code is in your angular controller
$scope.dropped = function(dragEl, dropEl){
 //do something with the elements, like wrap them in jqlite
 var drag = angular.element(dragEl);
 var drop = angular.element(dropEl);

 // and log a message
 console.log("the element " + drag.attr('id') + " has been dropped on the element " + drop.attr('id'));
};
```

###CSS###
2 custom classes are applied during the drag/drop lifecycle
+ lvl-over: applied to a drop target element when a draggable element is over it
+ lvl-target applied to all elements that are decorated with the x-lvl-drop-target attribute while an element is being dragged

###Events###
The directive fires 2 custom events that can you can listen for in your controller.
+ LVL-DRAG-START: fires when a drag operation begins
+ LVL-DRAG-END: fires when a drag operation completes

usage:
```javascript
    $scope.on("LVL-DRAG-START", function() {  /* do something when dragging start */ });
    $scope.on("LVL-DRAG-END", function() {  /* do something when dragging ends */ });
```