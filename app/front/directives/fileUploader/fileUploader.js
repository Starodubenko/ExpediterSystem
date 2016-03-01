(function () {
    angular.module('app.directives.fileUploader', [])
        .filter('fileAlreadyInArray', function () {
            return function (object, uploadedObject) {
                var isThere = false;
                angular.forEach(uploadedObject, function (value) {
                    if (!isThere) {
                        isThere = value.file.name == object.file.name;
                    }
                });
                return isThere;
            }
        })
        .directive('fileUploader', fileUploader);

    function fileUploader() {
        return {
            restrict: 'E',
            templateUrl: 'directives/fileUploader/fileUploader.html',
            controller: fileUploaderController,
            controllerAs: 'vm',
            link: linkFileUploader
        }
    }

    /** @ngInject */
    function fileUploaderController($scope, $element, $attrs, $filter, $timeout, Upload) {
        var vm = this;
        $scope.progressPercentage = 0;
        var uploadButton = null;
        var uploadProcess = null;

        $scope.uploadFile = function (button) {
            uploadButton =  angular.element(button.currentTarget);
            uploadProcess =  angular.element(button.currentTarget.previousElementSibling);
            var itemAlreadyInArray = $filter('fileAlreadyInArray')($scope.uploadObject, $scope.uploadedObjects);
            if (!itemAlreadyInArray) {
                uploadButton.addClass('hidden-element');
                uploadProcess.removeClass('hidden-element');
                $scope.upload($scope.uploadObject);
                // $scope.uploadObject.date = new Date();
                // $scope.uploadedObjects.push($scope.uploadObject);
            }
        };

        $scope.upload = function (file) {
            Upload.upload({
                url: '/upload-file',
                data: {fileForm: $scope.fileForm}
            }).then(function (resp) {
                // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                // $scope.uploadedObjects.push(resp);
                if (resp.status == 200 && $scope.progressPercentage == 100) {
                    $timeout(function(){
                        uploadProcess.addClass('hidden-element');
                        uploadButton.removeClass('hidden-element');
                        $scope.uploadedObjects.push($scope.uploadObject);
                    }, 200);
                }
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                // console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    }

    /** @ngInject */
    function linkFileUploader($scope, element, attributes) {

        $scope.uploadObject = [];

        $scope.selectFile = function (el) {
            $scope.uploadObject.file = el.files[0];
            $scope.$apply();
        };


        $scope.uploadedObjects = [
            {
                comment: "First file",
                date: "01.03.2016",
                file: {
                    name: "picture_111111111111111111111111111",
                    size: "1024MB"
                }
            },
            {
                description: "Second file",
                date: "01.03.2016",
                file: {
                    name: "picture_2",
                    size: "1.5MB"
                }
            },
            {
                description: "Third file",
                date: "01.03.2016",
                file: {
                    name: "picture_3",
                    size: "1MB"
                }
            }
        ];

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
                return el.file.name !== value;
            });
        };
    }
})();