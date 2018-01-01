'use strict';
describe('app.main module', function () {

  var suit = {};

  beforeEach(function () {
    module('ngRoute');
    module('app.main');
    module('ngAnimate');
    module('ngSanitize');
    module('ui.bootstrap');
    module('dialogs.main');
    module('app.main.dialogs');
    inject(function ($rootScope, $controller, $sce, dialogs, $timeout) {
      suit.scope = $rootScope.$new();
      suit.$sce = $sce;
      suit.dialogs = dialogs;
      suit.$timeout = $timeout;
      suit.ctrl = $controller("MainCtrl", {
        $scope: suit.scope,
        $sce: suit.$sce,
        dialogs: suit.dialogs,
        $timeout: suit.$timeout
      });
    });
  });

  describe('main controller', function () {

    it('should be defined', inject(function () {
      expect(suit.ctrl).toBeDefined();
    }));

  });
});