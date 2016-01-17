(function () {
    angular.module('app.directives.mainframe', [])
        .directive('mainFrame', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    data: '='
                },
                templateUrl: 'directives/mainFrame/mainFrame.html',

                link: function (scope, element) {
                    //scope.name = 'Jeff';
                },
                controller: function ($scope, $document) {
                    //console.log($scope.data);

                    $scope.selectInToolbar = function(){
                        $('.toolbar').toggleClass("open-toolbar");
                    };

                    $document.on("click", function(event){
                        if ($(event.target).attr('id') != "label-short-name" ||
                            $(!event.target).parent().hasClass('tool')){
                            $('.toolbar').removeClass("open-toolbar");
                        }

                    });

                    //scope.justClic = function(){
                    //
                    //}
                }
            }
        });
})();
