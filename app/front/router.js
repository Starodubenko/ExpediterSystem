(function () {
    angular.module('appRouter', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<home></home>'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/front/template/home.html'
                })
                .state('orders', {
                    url: '/orders',
                    template: '<orders></orders>'
                })
                .state('orders.morning', {
                    url: '/morning',
                    template: '<orders></orders>'
                })
                .state('orders.lunch', {
                    url: '/lunch',
                    template: '<orders></orders>'
                })
                .state('orders.evening', {
                    url: '/evening',
                    template: '<orders></orders>'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'app/front/template/home.html'
                })
                .state('about', {});

            $urlRouterProvider.otherwise('/');

        });

})();
