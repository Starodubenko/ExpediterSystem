(function () {
    angular.module('app.directives.work', [])
        .directive('orders', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/orders/orders.html',
                controller: function ($scope) {
                    console.log($scope.data);
                }
            }
        });
})();
