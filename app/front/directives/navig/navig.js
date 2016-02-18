(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/navig/navig.html',
                controller: function ($scope, $rootScope, $window, $location, NavigationService) {
                    var smallScreenBorder = 980;
                    $scope.currentStateOnSmallScreen = NavigationService.selected;

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
                            NavigationService.selected.tool = newState;
                        }
                    };
                },
                link: function($scope, element, attrs) {

                }
            }
        });
})();
