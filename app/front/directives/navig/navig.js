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
                    var navigw = angular.element($window);
                    //var navigW = navig.width();

                    $scope.getWindowWidth = function(){
                        return {
                            'w': navigw.width()
                        };
                    };

                    $scope.$watch($scope.getWindowWidth, function (newValue, oldValue) {
                        if (newValue.w > 992){
                            toolsContainer.css("display", "none");
                        }
                    }, true);

                    navigw.bind('navig', function () {
                        scope.$apply();
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
