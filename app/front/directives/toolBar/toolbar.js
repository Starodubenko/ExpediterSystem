(function () {
    angular.module('app.directives.toolbar', [])
        .directive('toolbar', toolbar)
        .factory('NavigationService', navigationService);

    /** @ngInject */
    function toolbar(){
        return {
            restrict: 'E',
            templateUrl: 'directives/toolbar/toolbar.html',
            scope: true,
            controller: navigationController,
            link: link
        }
    }

    /** @ngInject */
    function navigationController($scope, $document, NavigationService){
        $scope.selected = NavigationService.selected;

        $scope.tools = [
            {name: "Login", state: "login"},
            {name: "Test Layout", state: "testLayout"},
            {name: "Tools_3", state: "login"}
        ];

        $scope.selectInToolbar = function(toolName){
            $('.toolbar').toggleClass("open-toolbar");
            NavigationService.selected.tool = toolName;
        };

        $document.on("click", function(event){
            if ($(event.target).attr('id') != "label-short-name" ||
                $(!event.target).parent().hasClass('tool')){
                $('.toolbar').removeClass("open-toolbar");
            }

        });
    }

    /** @ngInject */
    function link($scope, element, attrs){

    }

    /** @ngInject */
    function navigationService() {
        var service = this;
        service.selected = {};
        service.selected.tool = "orders";

        return {
            selected: service.selected
        };
    }
})();
