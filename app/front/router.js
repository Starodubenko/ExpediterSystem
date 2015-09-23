(function () {
    angular.module('appRouter', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/index.html'
                })
                //.state('homee', {
                //    url: '/home',
                //    templateUrl: 'app/front/template/home.html'
                //})
                .state('about', {});

            $urlRouterProvider.otherwise('/');

        });

})();
