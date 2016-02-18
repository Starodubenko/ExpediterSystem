(function () {
    angular.module('app.directives.testLayout', [])
        .directive('testLayout', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/testLayout/index.html',
                scope: true,
                controller: function ($scope, $window) {
                    var navig = angular.element($window);
                    $scope.align = "center center";

                    navig.bind('resize', function(e){
                        var newWidth = navig.width();
                        $scope.winWidth = newWidth;
                        if (newWidth <= 980){
                            $scope.align = "start center";
                            $scope.$apply();
                        } else {
                            $scope.align = "center center";
                            $scope.$apply();
                        }

                    });
                }
            }
        });
})();
