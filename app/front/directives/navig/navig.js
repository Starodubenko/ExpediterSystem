(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function () {
            return {
                restrict: 'E',
                templateUrl: 'directives/navig/navig.html',
                controller: function ($scope, $rootScope, $window, $location) {
                    $scope.currentStateOnSmallScreen = "orders";

                    var navig = angular.element($window);
                    var navigOldWindth = 0;

                    navig.bind('resize', function(e){
                        var newWidth = navig.width();
                        if (navigOldWindth < newWidth && newWidth > 980){
                            $location.path('/');
                            //window.location = '#/';
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
