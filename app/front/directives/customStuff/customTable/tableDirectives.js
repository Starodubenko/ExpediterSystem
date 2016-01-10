angular.module('app').directive('gridScreen', function($http){
    return {
        restrict: 'E',
        link: function(scope, element, attributes){
            $http.get(attributes.resource).success(function(response){
                scope.rows = response.data;
                scope.$broadcast('ready-to-render', scope.rows,scope.cols)
            });
            console.log("grid-screen => activated!")
        },
        controller: function($scope){
            this.setEditor = function(editor){

            };
            this.setColumns = function(cols){
                $scope.cols = cols
            };
        }

    };
});
angular.module('app').directive('gridColumns', function() {
    return{
        restrict: 'E',
        require: ['^gridScreen', 'gridColumns'],
        link: function(scope, element, attributes, controllers){
            var gridScreenCtrl = controllers[0];
            var gridColumnsCtrl = controllers[1];
            gridScreenCtrl.setColumns(gridColumnsCtrl.getColumns());
            //scope.$watch()
        },
        controller: function(){
            var cols = [];
            this.addColumns = function(col){
                cols.push(col);
            };
            this.getColumns = function(){
                return cols;
            };
        }
    };
});
angular.module('app').directive('gridColumn', function() {
    return{
        restrict: 'E',
        require: '^gridColumns',
        link: function(scope, element, attributes, gridColumnsCtrl){
            gridColumnsCtrl.addColumns({
                title: attributes.title,
                field: attributes.field
            })
        }
    };
});
angular.module('app').directive('grid', function() {
    return{
        restrict: 'E',
        templateUrl: "directives/customStuff/customTable/table.html",
        replace: true,
        link: function(scope, element, attributes){

        },
        controller: function($scope){
            $scope.$on('ready-to-render', function(e, rows, cols){
                $scope.rows = rows;
                $scope.cols = cols;
            });
        }
    };
});
//angular.module('app').directive('withInlineEditor', function() {
//    return{
//        restrict: 'A',
//        link: function(scope, element, attributes){
//
//        }
//    };
//});