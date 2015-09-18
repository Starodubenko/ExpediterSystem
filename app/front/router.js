angular.module('appRouter', ['ui.router'])
    .config(function($stateProvider, $RouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);


    //$RouterProvider.when('/',
    //    {
    //        templateUrl: 'index.html'
    //
    //    });

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/front/template/home.html'
        })
        .state('about', {

        });

});
