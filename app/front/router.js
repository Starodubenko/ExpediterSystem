(function () {
    angular.module('appRouter', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<home></home>'
                })
                .state('work', {
                    url: '/work-area',
                    template:
                    //'<toolbar/>' +
                    '<div class="chat-frame"><chat></chat></div>' +
                    '<div class="dynamic-frame"><orders></orders></div>'
                })
                .state('login', {
                    url: '/login',
                    template: '<login></login>'
                })
                .state('chat', {
                    url: '/chat',
                    template:
                    //'<toolbar/>' +
                    '<div class="dynamic-frame"><chat></chat></div>'
                })
                .state('orders', {
                    url: '/orders',
                    template:
                    //'<toolbar/>' +
                    '<div class="dynamic-frame"><orders></orders></div>'
                })
                //.state('orders.morning', {
                //    url: '/morning',
                //    template: '<orders></orders>'
                //})
                //.state('orders.lunch', {
                //    url: '/lunch',
                //    template: '<orders></orders>'
                //})
                //.state('orders.evening', {
                //    url: '/evening',
                //    template: '<orders></orders>'
                //})
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'app/front/template/home.html'
                })
                .state('about', {});

            $urlRouterProvider.otherwise('/');

        });

})();
