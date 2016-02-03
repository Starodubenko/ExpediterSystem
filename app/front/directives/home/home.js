(function () {
    angular.module('app.directives.home', [])
        .directive('home', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/home/home.html',
                controller: function ($scope, $location) {
                    $location.path('/work-area');
                }
            }
        });
})();
