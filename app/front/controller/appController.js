(function () {
    angular.module('app').controller('AppController', ['$scope', appController]);

    function appController($scope) {

        $scope.humans = [
            {name: 'Vasya', lastName: 'Pupkin'},
            {name: 'Masha', lastName: 'Lazha'},
            {name: 'Lala', lastName: 'Shala'}
        ];

        //function getHumans(){
        //    $scope.humans = [
        //        {name: 'Vasya', lastName: 'Pupkin'},
        //        {name: 'Masha', lastName: 'Lazha'},
        //        {name: 'Lala', lastName: 'Shala'}
        //    ]
        //}
    }

})();
