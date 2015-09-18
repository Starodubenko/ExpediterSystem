var router = angular.module('appRouter', ['ui.router']);

router.config(function($stateProvider, $RouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);


    //$RouterProvider.when('/',
    //    {
    //        templateUrl: 'index.html'
    //
    //    });

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'index.html'
        })
        .state('about', {

        });

});
