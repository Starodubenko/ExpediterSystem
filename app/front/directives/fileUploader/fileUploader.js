(function () {
    angular.module('app.directives.fileUploader', [])
        .filter('fileAlreadyInArray', function(){
            return function(file, files) {
                var isThere = false;
                angular.forEach(files, function(value) {
                    if (!isThere){
                        isThere =  value.name == file.name;
                    }
                });
                return isThere;
            }
        })
        .directive('fileUploader', fileUploader);

    function fileUploader(){
        return{
            restrict: 'E',
            templateUrl: 'directives/fileUploader/fileUploader.html',
            controller: fileUploaderController,
            controllerAs: 'vm',
            link: linkFileUploader
        }
    }

    /** @ngInject */
    function fileUploaderController($scope, $element, $attrs, $filter){
        var vm = this;

        $scope.selectFile = function(el){
            angular.forEach(el.files, function(item) {
                var itemAlreadyInArray = $filter('fileAlreadyInArray')(item, $scope.selectedFiles);
                if (!itemAlreadyInArray){
                    $scope.selectedFiles.push(item);
                }
            });
            $scope.$apply();
        };
    }

    /** @ngInject */
    function linkFileUploader($scope, element, attributes){
        var wrapper = angular.element(element[0].firstChild)[0];
        var inputBlock = angular.element(wrapper.children[0])[0];
        var filesList = angular.element(wrapper.children[1])[0];
        var selectFileButton = angular.element(inputBlock.children[0])[0];
        var fileInput = angular.element(inputBlock.children[1])[0];

        $scope.selectedFiles = [
            {
                name: "picture_111111111111111111111111111",
                size: "1024MB"
            },
            {
                name: "picture_2",
                size: "1.5MB"
            },
            {
                name: "picture_3",
                size: "1MB"
            }
        ];

        $scope.clickSelectFileButton = function () {
            fileInput.click();
        };

        $scope.clickSelectFiles = function () {
            fileInput.click();
        };

        $scope.removeFile = function (el) {
            var removeElement = angular.element(el)[0].currentTarget;
            var value = removeElement.attributes['value'].value;

            $scope.selectedFiles = $scope.selectedFiles.filter(function (el) {
                return el.name !== value;
            });
        };
    }
})();