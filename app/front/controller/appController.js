angular.module('appController', []);

function AppCntl($scope){
    $scope.humans = [
        {name: 'Vasya', lastName: 'Pupkin'},
        {name: 'Masha', lastName: 'Lazha'},
        {name: 'Lala', lastName: 'Shala'}
    ]
}