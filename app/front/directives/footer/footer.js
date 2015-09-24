(function () {
    angular.module('app.directives.footer', [])
        .directive('footer', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/footer/footer.html',
                controller: function ($scope) {
                    console.log($scope.data);
                }
            }
        });
})();