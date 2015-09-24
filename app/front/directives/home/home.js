angular.module('app.directives.home', [])
    .directive('home', function(){
        return {
            restrict: 'E',
            scope:{
                data: '='
            },
            templateUrl: 'directives/home/home.html',
            controller: function($scope){
                console.log($scope.data);
            }
        }
    });