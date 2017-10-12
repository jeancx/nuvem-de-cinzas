'use strict';

angular.module('app.main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', function ($scope, $sce, $uibModal, dialogs, $rootScope, $timeout) {

        //shortcuts for scope: data and functions;
        var data = {}, fn = {};
        $scope.data = data;
        $scope.fn = fn;

        //init demo scene
        fn.demoScene = function () {

            /*
             . . * . . . * *
             . * * . . . . .
             * * * . A . . A
             . * . . . . . .
             . * . . . . A .
             . . . A . . . .
             . . . . . . . .
             */

            data.scenes.push([
                //C1, C2 ,C3  , C4 , C5 , C6 , C7 , C8
                ['.', '.', '*', '.', '.', '.', '*', '*'], //L1
                ['.', '*', '*', '.', '.', '.', '.', '.'], //L2
                ['*', '*', '*', '.', 'A', '.', '.', 'A'], //L3
                ['.', '*', '.', '.', '.', '.', 'A', '.'], //L4
                ['.', '*', '.', '.', '.', '.', 'A', '.'], //L5
                ['.', '.', '.', 'A', '.', '.', '.', '.'], //L6
                ['.', '.', '.', '.', '.', '.', '.', '.']  //L7
            ]);
            data.selected = 0;
        };

        fn.existAirport = function (day) {
            if (data.scenes.length > day) {
                for (var l = 0; l < data.scenes[day].length; l++) {
                    for (var c = 0; c < data.scenes[day][l].length; c++) {
                        if (data.scenes[day][l][c] === 'A') {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        fn.expandCloud = function (day, line, col) {
            var nLines = data.scenes[day].length;
            var nCols = data.scenes[day][0].length;
            //left
            if (col - 1 >= 0) {
                if (data.scenes[day][line][col - 1] === 'A') {
                    data.scenes[day][line][col - 1] = '*A';
                }
                else {
                    data.scenes[day][line][col - 1] = '*';
                }
            }
            //right
            if (col + 1 < nCols) {
                if (data.scenes[day][line][col + 1] === 'A') {
                    data.scenes[day][line][col + 1] = '*A';
                }
                else {
                    data.scenes[day][line][col + 1] = '*';
                }
            }
            //down
            if (line - 1 >= 0) {
                if (data.scenes[day][line - 1][col] === 'A') {
                    data.scenes[day][line - 1][col] = '*A';
                }
                else {
                    data.scenes[day][line - 1][col] = '*';
                }
            }
            //up
            if (line + 1 < nLines) {
                if (data.scenes[day][line + 1][col] === 'A') {
                    data.scenes[day][line + 1][col] = '*A';
                }
                else {
                    data.scenes[day][line + 1][col] = '*';
                }
            }
        };

        var wait = {};
        fn.calcDays = function (day) {
            console.log(day);
            if (day === 0) {
                wait = dialogs.wait("Calculando!", "Aguarde...", 0);
                while (data.scenes.length > 1) {
                    data.scenes.pop();
                }
            } else {
                $rootScope.$broadcast('dialogs.wait.progress', {'progress': (100 / data.scenes * day)});
            }
            if (fn.existAirport(day)) {
                data.scenes.push(angular.copy(data.scenes[day]));
                for (var l = 0; l < data.scenes[day].length; l++) {
                    for (var c = 0; c < data.scenes[day][l].length; c++) {
                        if (data.scenes[day][l][c] === '*' || data.scenes[day][l][c] === '*A') {
                            fn.expandCloud(day + 1, l, c);
                        }
                    }
                }
                fn.calcDays(day + 1);
            } else if (day === 0) {
                dialogs.error("Alerta!", "Insira pelo menos um Aeroporto!");
            } else {
                $timeout(function () {
                    wait.opened.then(function () {
                        wait.close();
                    });
                }, 500);
            }
        };


        //start controller variables
        fn.start = function () {
            data.scenes = [];
            data.selected = 0;
            data.table = {
                '*': $sce.trustAsHtml('<img src="images/cloud.png"/>'),
                '*A': $sce.trustAsHtml('<img src="images/cloud.png" class="active"/>'),
                'A': $sce.trustAsHtml('<img src="images/airport.png"/>'),
                '.': $sce.trustAsHtml('<!-- sky -->')
            };
            fn.demoScene();
        };

        fn.start();


        fn.newScene = function () {
            var nLines = data.scenes[0].length;
            var nCols = data.scenes[0][0].length;
            var dlg = dialogs.create('main/dialogs/new.html', 'newSceneDialogCtrl', {rows: nLines, cols: nCols}, 'lg');
            dlg.result.then(function (res) {
                fn.cleanScene(res.rows, res.cols);
            });
        };

        fn.selectType = function (row, col, val) {
            if (data.selected === 0) {
                var dlg = dialogs.create('main/dialogs/type.html', 'typeDialogCtrl', {type: val}, 'lg');
                dlg.result.then(function (res) {
                    console.log(res, data.scenes[0][row][col]);
                    data.scenes[0][row][col] = res.type;
                    console.log(res, data.scenes[0][row][col]);
                });
            } else {
                dialogs.error("Alerta!", "Somente é possivel editar o primeiro dia!");
            }
        };

        fn.cleanScene = function (nLines, nCols) {
            if (!nLines) {
                nLines = data.scenes[0].length;
            }
            if (!nCols) {
                nCols = data.scenes[0][0].length;
            }
            data.scenes = [];
            data.scenes.push([]);
            for (var l = 0; l < nLines; l++) {
                data.scenes[0].push([]);
                for (var c = 0; c < nCols; c++) {
                    data.scenes[0][l].push('.');
                }
            }
        };


    }).controller('newSceneDialogCtrl', function ($scope, $uibModalInstance, data) {


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

}).controller('typeDialogCtrl', function ($scope, $uibModalInstance, data) {

    console.log(data);

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

});