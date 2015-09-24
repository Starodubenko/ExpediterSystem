(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/navig/navig.html',
                controller: function ($scope) {
                    console.log($scope.data);
                }
            }
        });
})();
