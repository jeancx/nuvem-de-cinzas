'use strict';

angular.module('app.main.dialogs',[])

  .controller('typeDialogCtrl', function ($scope, $uibModalInstance, data) {
      $scope.model = {
        type: data.type
      };


      $scope.cancel = function () {
        $uibModalInstance.dismiss('Canceled');
      };

      $scope.save = function () {
        $uibModalInstance.close($scope.model);
      };

      $scope.hitEnter = function (evt) {
        if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.model.type, null) || angular.equals($scope.model.type, '')))
          $scope.save();
      };
    }
  );
