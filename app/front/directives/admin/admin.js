(function () {
    angular.module('app.directives.admin', [])
        //.factory('Message', function($resource) {
        //    return $resource('/chat-history/:interlocutorId', { interlocutorId: '@_id' }, {
        //        update: {
        //            method: 'PUT'
        //        }
        //    });
        //})
        .directive('admin', function ($http) {
            return {
                restrict: 'E',
                templateUrl: "directives/chat/chat.html",
                scope: true,
                controller: function ($scope, Message) {
                    
                }
            };
        });
})();
