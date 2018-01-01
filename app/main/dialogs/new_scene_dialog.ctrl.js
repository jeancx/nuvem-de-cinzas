'use strict';

angular.module('app.main.dialogs',[])

    .controller('newSceneDialogCtrl', function ($scope, $uibModalInstance, data) {
        $scope.model = {
            rows: data.rows,
            cols: data.cols
        };

        console.log($scope.model);

        $scope.cancel = function () {
            $uibModalInstance.dismiss('Canceled');
        };

        $scope.save = function () {
            $uibModalInstance.close($scope.model);
        };

        $scope.hitEnter = function (evt) {
            if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.model.rows, null) || angular.equals($scope.model.cols, '')))
                $scope.save();
        };
    });
