(function () {
    angular.module('app.directives.navig', [])
        .directive('navig', function ($window) {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/navig/navig.html',
                link: function($scope, element, attrs) {
                    var toolsContainer = $('.tools-container');

                    angular.element($window).bind('resize', function(){
                        console.log("Window was resized!!!")
                    });
                },
                controller: function ($scope) {
                    var toolsContainer = $('.tools-container');

                    $scope.showToolsPanel = function(){
                        toolsContainer.slideToggle();
                        toolsContainer.css("display", "inline-block")
                    };
                }
            }
        });
})();
