#Angular Directives#

##Drag-Drop Directive##
An easy to use, native, directive to enable drag/drop in your angular app.  This directive has no dependency on jQuery or other frameworks, it does require a browser that supports the HTML5 drag/drop events.

[Live Demo](http://logicbomb.github.io/ng-directives/drag-drop.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/01/angularjs-drag-and-drop/)

##File Upload Directive##
A native directive that supports uploading multiple files and data.  It exposes a simple API that a parent scope can use to track upload progress, errors and completion.

The [demo](https://github.com/logicbomb/ng-directives/blob/master/tests/xhr-svc-integration.html) requires node.js and the express package so files can be posted to a [server](https://github.com/logicbomb/ng-directives/blob/master/server/server.js).

[Documentation](http://jasonturim.wordpress.com/2013/09/11/angularjs-native-multi-file-upload-with-progress)

#Services#

##UUID Service##
A very simple service for working with [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

[Live Demo](http://logicbomb.github.io/ng-directives/uuid.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/01/angularjs-drag-and-drop/)

##XHR Post Service##
A service that posts files and data to a url, and uses promises and callbacks to notify it's parent of upload events.

[Unit Test](http://logicbomb.github.io/ng-directives/xhr-svc-unit.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/11/angularjs-native-multi-file-upload-with-progress)

