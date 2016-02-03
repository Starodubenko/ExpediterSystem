(function () {
    angular.module('app.directives.login', [])
        .factory('User', function($resource) {
            return $resource('/chat-history/:interlocutorId', { interlocutorId: '@_id' }, {

            });
        })
        .directive('login', function ($http) {
            return {
                restrict: 'E',
                templateUrl: "directives/login/login.html",
                scope: {
                    url: "="
                },
                controller: function ($scope, Message) {
                    //Message.get({interlocutorId: 1});
                }
            };
        });
})();
