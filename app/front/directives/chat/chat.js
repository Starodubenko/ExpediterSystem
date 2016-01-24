(function () {
    angular.module('app.directives.chat', [])
        .factory('Message', function($resource) {
            return $resource('/chat-history/:interlocutorId', { interlocutorId: '@_id' }, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .directive('chat', function ($http) {
            return {
                restrict: 'E',
                templateUrl: "directives/chat/chat.html",
                scope: true,
                controller: function ($scope, Message) {
                    var textarea = $('.input-area>textarea');
                    $scope.contactListIsOpen = false;
                    $scope.curentInterlocutor = {};

                    //$http.get("/front/directives/chat/data.json").success(function (response) {
                    //    $scope.chatHistory = response.data;
                    //});

                    $http.get("/front/directives/chat/contacts-data.json").success(function (response) {
                        $scope.contactList = response.data;
                    });

                    $scope.sendMessage = function () {
                        var newMessage = {
                            sender:"J.Smith",
                            date: "08.01.2016",
                            text : $scope.message,
                            me: true
                        };
                        $scope.chatHistory.data.push(newMessage);
                        Message.save({from:'1', to: '2', newMessage:newMessage}, function() {
                            console.log('Save message is successful');
                            $scope.message = '';
                        });
                    };

                    $scope.insertSmiley = function () {

                    };

                    $scope.openContactList = function () {
                        $scope.contactListIsOpen = !$scope.contactListIsOpen;
                    };

                    $scope.selectContact = function (contactId, contactName, contactImage, contactStatus) {
                        $scope.chatHistory = Message.get({ interlocutorId: contactId });
                        $scope.curentInterlocutor.name = contactName;
                        $scope.curentInterlocutor.image = contactImage;
                        $scope.curentInterlocutor.status = contactStatus;
                        $scope.contactListIsOpen = !$scope.contactListIsOpen;
                    };
                }
            };
        });
})();
