(function () {
    angular.module('app').controller('AppController', ['$scope', '$http', appController]);

    function appController($scope, $http) {

        var refresh = function(){
            $http.get('/users').success(function(response){
                $scope.users = response;
            });
        };

        refresh();

        $scope.addHuman = function(){
            $http.post('/users', $scope.human).success(function(response){
                //todo put request
                refresh();
            });
        };

        $scope.remove = function(id){
            $http.delete('/users/' + id)
        };
    }
})();
