(function () {
    'use strict'
    var uscensusApp = angular.module('uscensusApp');

    function UsCensusCtrl($scope, uscensusService) {

        $scope.columns = [];

        $scope.items = [];

        $scope.allNB = 0;

        $scope.isLoading = false;

        $scope.selected = { value: 'pick a column' };

        var allColumnsService = uscensusService.getAllColumns().get();

        allColumnsService.$promise.then(function (response) {
            if (!!response && !!response.data) {
                $scope.columns = response.data;
            } else {
                alert('Error in the backend..');
            }
        });

        $scope.getValues = function () {

            clearData();

            $scope.isLoading = true;

            $scope.progress = 0;

            var interval = setInterval(function () {
                if ($scope.progress != 90) {
                    $scope.progress = $scope.progress + 10;
                }
            }, 500);

            var getValuesService = uscensusService.getValuesByCol($scope.selected.value).get();

            getValuesService.$promise.then(function (response) {
                if (!!response && !!response.data) {

                    $scope.items = response.data;
                    $scope.isLoading = false;
                    $scope.progress = 100;
                    clearInterval(interval);
                    if ($scope.items.length == 100) {
                        var getTotalNbService = uscensusService.getTotalNb($scope.selected.value).get();
                        getTotalNbService.$promise.then(function (response) {
                            $scope.allNB = response.data[0].nb;
                        });
                    } else {
                        $scope.allNB = $scope.items.length;
                    }
                } else {
                    alert('Error in the backend..');
                }
            });
        }

        function clearData() {
            $scope.items = [];

            $scope.allNB = 0;
        }
    }



    UsCensusCtrl.$inject = ['$scope', 'uscensusService'];

    uscensusApp.controller('UsCensusCtrl', UsCensusCtrl);

})();