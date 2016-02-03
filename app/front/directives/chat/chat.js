(function () {
    angular.module('app.directives.chat', [])
        .factory('Message', function ($resource) {
            return $resource('/chat-history/:interlocutorId', {interlocutorId: '@_id'}, {
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
                    var pressedKeys = {};
                    var socket = io.connect();
                    var messagePatern = {
                        sender: "J.Smith",
                        date: "08.01.2016",
                        text: "",
                        me: true
                    };
                    $scope.contactListIsOpen = false;
                    $scope.curentInterlocutor = {};

                    //$scope.chatHistory = Message.get({interlocutorId: 1});
                    $scope.chatHistory = {data:[]};

                    $http.get("/front/directives/chat/contacts-data.json").success(function (response) {
                        $scope.contactList = response.data;
                    });

                    textarea.bind('keypress', function (e) {
                        if (e.keyCode == 13) {
                            if (!pressedKeys[13] || !pressedKeys[16]) {
                                return false;
                            }
                        }
                    });
                    textarea.bind('keydown', function (e) {
                        pressedKeys[e.which] = true;
                    });
                    textarea.bind('keyup', function (e) {
                        pressedKeys = {};
                    });


                    $scope.keyDown = function (ev) {
                        if (ev.which === 13) {
                            if (!pressedKeys[13] || !pressedKeys[16]) {
                                $scope.sendMessage();
                            }
                        }
                    };

                    $scope.sendMessage = function () {
                        if ($scope.message) {
                            var newMessage = $.extend(true, {}, messagePatern);
                            newMessage.text = $scope.message;
                            newMessage.$$hashKey = "";
                            $scope.chatHistory.data.push(newMessage);
                            Message.save({from: '1', to: '2', newMessage: newMessage}, function () {
                                console.log('Save message is successful');
                                $scope.message = '';
                            });
                            socket.emit('message', {newMessage: newMessage});
                        }
                    };
                    socket
                        .on('message', function (data) {
                            var chatHistory = $scope.chatHistory;
                            if (chatHistory != null) {
                                chatHistory.data.push(data.newMessage);
                                $scope.$apply();
                            }
                        })
                        .on('connect', function () {
                            var chatHistory = $scope.chatHistory;
                            if (chatHistory != null) {
                                var newMessage = $.extend(true, {}, messagePatern);
                                newMessage.$$hashKey = "";
                                newMessage.text = "Connected !!!";
                                chatHistory.data.push(newMessage);
                                $scope.$apply();
                            }
                        })
                        .on('disconnect', function () {
                            var chatHistory = $scope.chatHistory;
                            if (chatHistory != null) {
                                var newMessage = $.extend(true, {}, messagePatern);
                                newMessage.$$hashKey = "";
                                newMessage.text = "Disconnected !!!";
                                chatHistory.data.push(newMessage);
                                $scope.$apply();
                            }
                        })
                        .on('reconnect_failed', function () {
                            var chatHistory = $scope.chatHistory;
                            if (chatHistory != null) {
                                var newMessage = $.extend(true, {}, messagePatern);
                                newMessage.$$hashKey = "";
                                newMessage.text = "Reconnect failed !!!";
                                chatHistory.data.push(newMessage);
                                $scope.$apply();
                            }
                        });

                    $scope.insertSmiley = function () {

                    };

                    $scope.openContactList = function () {
                        $scope.contactListIsOpen = !$scope.contactListIsOpen;
                    };

                    $scope.selectContact = function (contactId, contactName, contactImage, contactStatus) {
                        $scope.chatHistory = Message.get({interlocutorId: contactId});
                        $scope.curentInterlocutor.name = contactName;
                        $scope.curentInterlocutor.image = contactImage;
                        $scope.curentInterlocutor.status = contactStatus;
                        $scope.contactListIsOpen = !$scope.contactListIsOpen;
                    };
                }
            };
        });
})();
