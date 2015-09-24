(function () {
    angular.module('app.directives.work', [])
        .directive('work', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/work/work.html',
                controller: function ($scope) {
                    console.log($scope.data);
                }
            }
        });
})();
