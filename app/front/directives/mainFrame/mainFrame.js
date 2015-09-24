angular.module('app.directives.mainframe', [])
    .directive('mainFrame', function(){
        return {
            restrict: 'E',
            scope:{
                data: '='
            },
            templateUrl: 'directives/mainFrame/mainFrame.html',
            controller: function($scope){
                console.log($scope.data);
            }
        }
    });