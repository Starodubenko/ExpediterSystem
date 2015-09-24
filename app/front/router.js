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
                .state('work', {
                    url: '/work',
                    template: '<work></work>'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'app/front/template/home.html'
                })
                .state('about', {});

            $urlRouterProvider.otherwise('/');

        });

})();
