(function () {
    angular.module('appRouter', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'main': {
                            template: '<home></home>'
                        }
                    }
                })
                .state('work', {
                    url: '/work-area',
                    views: {
                        'main': {
                            template:
                            '<div class="chat-frame"><chat></chat></div>' +
                            '<div class="dynamic-frame"><orders></orders></div>'
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    views: {
                        'main': {
                            template: '<login></login>'
                        }
                    }
                })
                .state('chat', {
                    url: '/chat',
                    views: {
                        'main': {
                            template:
                                '<div class="dynamic-frame"><chat></chat></div>'
                        }
                    }
                })
                .state('orders', {
                    url: '/orders',
                    views: {
                        'main': {
                            template:
                                '<div class="dynamic-frame"><orders></orders></div>'
                        }
                    }
                })
                .state('testLayout', {
                    url: '/test-layout',
                    views: {
                        'testLayout': {
                            template: '<test-layout></test-layout>'
                        }
                    }
                })

                .state('admin', {
                    url: '/admin',
                    views: {
                        'main': {
                            templateUrl: 'app/front/template/home.html'
                        }
                    }
                })
                .state('about', {});

            $urlRouterProvider.otherwise('/');

        });

})();
