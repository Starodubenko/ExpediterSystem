(function () {
    angular.module('app').controller('AppController', ['$scope', '$http', appController]);

    function appController($scope, $http) {

        var refresh = function(){
            $http.get('/humans').success(function(response){
                $scope.humans = response;
            });
        };

        refresh();

        $scope.addHuman = function(){
            $http.post('/humans', $scope.human).success(function(response){
                //todo put request
                refresh();
            });
        };

        $scope.remove = function(id){
            $http.delete('/humans/' + id)
        };
    }
})();
