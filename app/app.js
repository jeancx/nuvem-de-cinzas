'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'app.main',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'dialogs.main',
    'app.main.dialogs'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/main'});
}]);
