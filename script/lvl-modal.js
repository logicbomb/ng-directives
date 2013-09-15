angular
.module('lvl.directives.modal', [])
.directive('lvlModal', function () {
    return {
        restrict: 'A',
        scope: {
            modalDisplay: '@',
            modalWhen: '='
        },
        template:
            '<style> ' +
            '    .hidden { display: none; } ' +
            '    .modal { ' +
            '             position: absolute; ' +
            '             left: 0; ' +
            '             top: 25px; ' +
            '             background-color: black; ' +
            '             -moz-opactity: 0.7; ' +
            '             opacity: 0.7; ' +
            '             filter: alpha(opacity=70); ' +
            '             width: 100%; ' +
            '             height:100%;' +
            '             z-index: 90;' +
            '    } ' +
            '    .visible { ' +
            '       	  display: block; ' +
            '       	  z-index: 100; ' +
	        '       	  position: absolute; ' +
	        '       	  top: 25%; ' +
	        '       	  left: 25%; ' +
	        '       	  background-color: white; ' +
            '    } ' +
            '} ' +
            '</style> ' +
            '<div class="modal hidden"></div>',
        link: function (scope, el, attrs, controller) {
            var ct = angular.element(document.getElementById(attrs.modalDisplay));
            ct.addClass('hidden');
            scope.$watch('modalWhen', function (n, o) {
                var modal = angular.element(angular.element(el).children()[1]);
                if (n && n.toString().toLowerCase() === 'true') {
                	modal.removeClass('hidden');
                	ct.addClass('visible');
                	ct.removeClass('hidden');
                }else {
                	ct.removeClass('visible');
                	modal.addClass('hidden');
                	ct.addClass('hidden');
                }
            });
        }
    }
});

function MyCtrl($scope) {
    $scope.name = 'Superhero';
    $scope.showModal = false;
}