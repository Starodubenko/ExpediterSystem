(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function ($window,$location) {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/navig/navig.html',
                link: function($scope, element, attrs) {
                    var toolsContainer = $('.tools-container');
                    var navig = angular.element($window);

                    navig.bind('resize', function(){
                        if (navig.width() > 980){
                            toolsContainer.css("display", "none");
                            //$location.path("/");
                            //window.location = "#/"
                        }
                    });
                },
                controller: function ($scope) {
                    var toolsContainer = $('.tools-container');
                    var currentStateOnSmallScreen = "orders";

                    $scope.showToolsPanel = function(){
                        //toolsContainer.slideToggle();
                        //toolsContainer.css("display", "inline-block");
                        $('.toolbar').toggleClass("open-toolbar");
                    };

                    $scope.switchCurrentState = function(newState){
                        if (newState != null){
                            currentStateOnSmallScreen = newState;
                        }
                    }
                }
            }
        });
})();
