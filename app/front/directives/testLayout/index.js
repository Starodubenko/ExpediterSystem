(function () {
    angular.module('app.directives.testLayout', [])
        .directive('testLayout', function ($mdSidenav) {
            return {
                restrict: 'E',
                templateUrl: 'directives/testLayout/index.html',
                scope: true,
                bindToController: true,
                controllerAs: "vm",
                controller: function ($scope, $window) {
                    var navig = angular.element($window);
                    $scope.align = "center center";

                    navig.bind('resize', function (e) {
                        var newWidth = navig.width();
                        $scope.winWidth = newWidth;
                        if (newWidth <= 1280) {
                            $scope.align = "start center";
                            $scope.$apply();
                            $mdSidenav('left').close()
                        } else {
                            $scope.align = "center center";
                            $scope.$apply();
                        }

                    });

                    var previous = null;
                    $scope.selectTool = function (e) {
                        if (previous) {
                            previous.toggleClass('test-selected-tool');
                        }
                        angular.element(e.target.children[1]).toggleClass('test-selected-tool');

                        previous = angular.element(e.target.children[1]);
                        $scope.toggleLeft();
                    };

                    $scope.toggleLeft = function () {
                        $scope.toggleSlidePanel('left');
                    };

                    $scope.toggleSlidePanel = function (panelid) {
                        $mdSidenav(panelid).toggle();
                    };
                }
            }
        })
})();
