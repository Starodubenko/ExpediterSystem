(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/navig/navig.html',
                controller: function ($scope, $rootScope, $window, $location) {
                    var smallScreenBorder = 980;
                    $scope.currentStateOnSmallScreen = "orders";
                    $scope.isSmallScreen = false;

                    var navig = angular.element($window);

                    navig.bind('resize', function(e){
                        var newWidth = navig.width();
                        if ($scope.isSmallScreen && newWidth > smallScreenBorder){
                            window.location = '#/';//$location.path('/');
                            $scope.isSmallScreen = !$scope.isSmallScreen;
                        } else if (!$scope.isSmallScreen && newWidth < smallScreenBorder){
                            window.location = '#/' + $scope.currentStateOnSmallScreen;
                            $scope.isSmallScreen = !$scope.isSmallScreen;
                        }
                    });

                    $scope.showToolsPanel = function(){
                        $('.toolbar').toggleClass("open-toolbar");
                    };

                    $scope.switchCurrentState = function(newState){
                        if (newState != null){
                            $scope.currentStateOnSmallScreen = newState;

                            $rootScope.$broadcast('selected-main-tool');
                        }
                    };

                    $scope.$on('selected-additional-tool', function (event, data) {
                        $scope.currentStateOnSmallScreen = '';
                    });
                },
                link: function($scope, element, attrs) {

                }
            }
        });
})();
