'use strict';
describe('app.main module', function () {

  var suit = {}, demoScene;

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

    demoScene = [
      //C1, C2 ,C3  , C4 , C5 , C6 , C7 , C8
      ['.', '.', '*', '.', '.', '.', '*', '*'], //L1
      ['.', '*', '*', '.', '.', '.', '.', '.'], //L2
      ['*', '*', '*', '.', 'A', '.', '.', 'A'], //L3
      ['.', '*', '.', '.', '.', '.', 'A', '.'], //L4
      ['.', '*', '.', '.', '.', '.', 'A', '.'], //L5
      ['.', '.', '.', 'A', '.', '.', '.', '.'], //L6
      ['.', '.', '.', '.', '.', '.', '.', '.']  //L7
    ];
  });

  describe('main controller', function () {

    it('should be defined', inject(function () {
      expect(suit.ctrl).toBeDefined();
    }));

    it('demo scene should be started', function () {
      suit.scope.fn.demoScene();

      expect(suit.scope.data.scenes[0]).toEqual(demoScene);
    });



  });
});