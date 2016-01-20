(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function ($window,$location) {
            return {
                restrict: 'E',
                templateUrl: 'directives/navig/navig.html',
                link: function($scope, element, attrs) {
                    var toolsContainer = $('.tools-container');
                    var navig = angular.element($window);

                    navig.bind('resize', function(){
                        if (navig.width() > 980){
                            toolsContainer.css("display", "none");
                        }
                    });

                    navig.bind('resize', function(){
                        if (navig.width() > 980){
                            toolsContainer.css("display", "none");
                        }
                    });
                },
                controller: function ($scope) {
                    var toolsContainer = $('.tools-container');
                    $scope.currentStateOnSmallScreen = "orders";

                    $scope.showToolsPanel = function(){
                        $('.toolbar').toggleClass("open-toolbar");
                    };

                    $scope.switchCurrentState = function(newState){
                        if (newState != null){
                            $scope.currentStateOnSmallScreen = newState;

                            $scope.$parent.$broadcast('selected-main-tool');
                        }
                    };

                    $scope.$on('selected-additional-tool', function (event, data) {
                        $scope.currentStateOnSmallScreen = '';
                    });
                }
            }
        });
})();
