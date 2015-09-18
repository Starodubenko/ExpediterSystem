(function () {
    angular.module('app').controller('AppController', ['$scope', '$http', appController]);

    function appController($scope, $http) {

        $http.get('/humans').success(function(response){
            $scope.humans = response;
        });
    }

})();
