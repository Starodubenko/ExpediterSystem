(function () {
    angular.module('app.directives.chat', [])
        .directive('chat', function ($http) {
            return {
                restrict: 'E',
                templateUrl: "directives/chat/chat.html",
                controller: function ($scope) {
                    var textarea = $('.input-area>textarea');

                    $http.get("/front/directives/chat/data.json").success(function (response) {
                        $scope.chatHistory = response.data;
                    });

                    $scope.sendMessage = function () {

                    };

                    $scope.insertSmiley = function () {

                    };
                }
            };
        });
})();
