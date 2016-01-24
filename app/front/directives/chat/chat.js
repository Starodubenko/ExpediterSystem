(function () {
    angular.module('app.directives.chat', [])
        .directive('chat', function ($http) {
            return {
                restrict: 'E',
                templateUrl: "directives/chat/chat.html",
                controller: function ($scope) {
                    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                    var textarea = $('.input-area>textarea');
                    $scope.contactListIsOpen = false;

                    //$http.get("/front/directives/chat/data.json").success(function (response) {
                    //    $scope.chatHistory = response.data;
                    //});

                    $http.get("/front/directives/chat/contacts-data.json").success(function (response) {
                        $scope.contactList = response.data;
                    });

                    $scope.sendMessage = function () {

                    };

                    $scope.insertSmiley = function () {

                    };

                    $scope.openContactList = function () {
                        $scope.contactListIsOpen = !$scope.contactListIsOpen;
                    };

                    $scope.selectContact = function (contactId, contactName, contactImage, contactStatus) {
                        $http.post("/chat-history", {"interlocutorId":contactId}).success(function (response) {
                            $scope.chatHistory = response.data;
                            $scope.curentInterlocutor.name = contactName;
                            $scope.curentInterlocutor.image = contactImage;
                            $scope.curentInterlocutor.status = contactStatus;
                        });
                    };
                }
            };
        });
})();
