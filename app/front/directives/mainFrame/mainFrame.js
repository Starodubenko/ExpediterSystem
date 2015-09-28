(function () {
    angular.module('app.directives.mainframe', [])
        .directive('mainFrame', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    data: '='
                },
                templateUrl: 'directives/mainFrame/mainFrame.html',
                compile: function (element, attrs) {
                    var content = angular.element('<div class="panel panel-default main-frame"></div>');
                    content.append(element.contents());
                    element.replaceWith(content);
                },
                link: function (scope, element) {
                    //scope.name = 'Jeff';
                },
                controller: function ($scope) {
                    console.log($scope.data);
                }
            }
        });
})();
