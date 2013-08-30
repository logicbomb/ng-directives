Angular Directives and Services
=============

**UUID Service**
A very simple service for working with [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

Operations:
+ uuid.new() - generates a new UUID based on the code found here: http://stackoverflow.com/a/16693578
+ uuid.empty() - get's an empty UUID ('00000000-0000-0000-0000-000000000000') 

Usage:

1.  download the file [lvl-uuid.js](https://raw.github.com/logicbomb/ng-directives/master/src/script/lvl-uuid.js)

2.  include it in your html

3.  inject it into our angular controller

[Live Demo](http://logicbomb.github.io/ng-directives/uuid.html)

```html
	<!-- this line is included before your angular application script -->
	<!-- the src path is specific to your project -->
	<script src="/scripts/angular/lvl-uuid.js"></script>
```
```javascript
	angular
		.module('myApplication', ['lvl.services']) //register the factory with your module
		.controller('myController', ['$scope', 'uuid', function($scope, uuid) { //inject the service into your application
			var newUuid = uuid.new(); //use the service
			var emptyUuid = uuid.empty(); //use the service
		}]);

```

