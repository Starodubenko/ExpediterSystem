(function () {
    angular.module('app.directives.mainframe', [])
        .directive('mainFrame', function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'directives/mainFrame/mainFrame.html',

                link: function (scope, element) {

                },
                controller: function ($scope, $document) {
                    $scope.selectedTool = "";

                    $scope.selectInToolbar = function(toolName){
                        $('.toolbar').toggleClass("open-toolbar");
                        $scope.selectedTool = toolName;
                        $scope.$parent.$broadcast('selected-additional-tool');
                    };

                    $scope.$on('selected-main-tool', function (event, data) {
                        $scope.selectedTool = '';
                    });

                    $document.on("click", function(event){
                        if ($(event.target).attr('id') != "label-short-name" ||
                            $(!event.target).parent().hasClass('tool')){
                            $('.toolbar').removeClass("open-toolbar");
                        }

                    });
                }
            }
        });
})();
