(function () {
    angular.module('app.directives.fileUploader', ['ngAnimate', 'ngMaterial', 'monospaced.mousewheel', 'ngFileUpload'])
        .filter('fileAlreadyInArray', function () {
            return function (object, uploadedObjects) {
                var isThere = false;
                angular.forEach(uploadedObjects, function (value) {
                    if (!isThere) {
                        isThere = value.name == object.file.name;
                    }
                });
                return isThere;
            }
        })
        .directive('fileUploader', fileUploader);

    /** @ngInject */
    function fileUploader(Upload, $filter, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'fileUploader.html',
            link: linkFileUploader
        };

        function linkFileUploader($scope, element, attributes) {

            $scope.progressPercentage = 0;
            $scope.statusCode = -1;
            $scope.uploadObject = {};
            $scope.uploadedObjects = [];
            $scope.fileIsUploading = false;

            var uploadButton = null;
            var uploadProcess = null;

            $scope.uploadFile = function (button) {
                uploadButton = angular.element(button.currentTarget);
                uploadProcess = angular.element(button.currentTarget.previousElementSibling);
                var itemAlreadyInArray = $filter('fileAlreadyInArray')($scope.uploadObject, $scope.uploadedObjects);

                if (!$scope.uploadObject.file) {
                    $scope.statusCode = 1;
                } else if (!itemAlreadyInArray) {
                    uploadButton.addClass('hidden-element');
                    uploadProcess.removeClass('hidden-element');
                    $scope.fileIsUploading = true;
                    $scope.upload($scope.uploadObject.file);
                } else {
                    $scope.statusCode = 0;
                }
            };

            $scope.upload = function (file) {
                Upload.upload({
                    url: '/upload-file',
                    data: {file: file, comment: $scope.uploadObject.comment}
                }).then(function (resp) {
                    if (resp.status == 200) {
                        $timeout(function () {
                            uploadProcess.addClass('hidden-element');
                            uploadButton.removeClass('hidden-element');

                            $scope.uploadedObjects.push({
                                name: $scope.uploadObject.file.name,
                                comment: $scope.uploadObject.comment,
                                date: resp.data.currentDate
                            });
                            $scope.uploadObject = {};
                            $scope.progressPercentage = 0;
                            $scope.fileIsUploading = false;
                            $scope.statusCode = 2;
                        }, 200);
                    }
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            };

            $scope.$watch('uploadObject.file', function (newValue) {
                if (newValue) {
                    $scope.statusCode = -1;
                }
            });

            $scope.horizontalScroll = function (element) {
                var deltaY = element.deltaY;
                element.target.scrollLeft = element.target.scrollLeft + deltaY / 3 * 5;
                event.preventDefault();
            };

            $scope.clickSelectFileButton = function (el) {
                var sibling = el.currentTarget.nextElementSibling;
                sibling.click();
            };

            $scope.removeFile = function (el) {
                var removeElement = angular.element(el)[0].currentTarget;
                var value = removeElement.attributes['value'].value;

                $scope.uploadedObjects = $scope.uploadedObjects.filter(function (el) {
                    return el.name !== value;
                });
            };
        }
    }
})();