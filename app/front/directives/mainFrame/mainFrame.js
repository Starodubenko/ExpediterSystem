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

                link: function (scope, element) {
                    //scope.name = 'Jeff';
                },
                controller: function ($scope) {
                    console.log($scope.data);
                }
            }
        });
})();
