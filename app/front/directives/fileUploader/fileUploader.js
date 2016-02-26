(function () {
    angular.module('app.directives.fileUploader', [])
        .config(function($mdIconProvider) {
            $mdIconProvider
                .iconSet('upload', 'app/front/directives/fileUploader/ic_file_upload_black_24dp_2x.png', 24);
        })
        .directive('fileUploader', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'directives/fileUploader/fileUploader.html',
                controller: function ($scope) {
                    console.log($scope.data);
                },
                link: function ($scope, element, attributes) {
                    var wrapper = angular.element(element[0].firstChild)[0];
                    var inputBlock = angular.element(wrapper.children[0])[0];
                    var filesList = angular.element(wrapper.children[1])[0];
                    var selectFileButton = angular.element(inputBlock.children[0])[0];
                    var fileInput = angular.element(inputBlock.children[1])[0];

                    $scope.selectedFiles = [
                        {
                            name: "picture_1",
                            size: "2MB"
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
            }
        });
})();