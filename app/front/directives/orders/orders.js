(function () {
    angular.module('app.directives.work', [])
        .directive('orders', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/orders/orders.html',
                controller: function ($scope) {
                    $scope.currentState = "morning";

                    $scope.switchCurrentState = function(newState){
                        if (newState == $scope.currentState){
                            $scope.currentState = '';
                        } else {
                            $scope.currentState = newState;
                        }
                    };

                    $scope.$watch('findOverAllOrders', function(oldVal, newVal){
                        //alert("Catch change of find row!!!")
                    })
                }
            }
        });
})();
