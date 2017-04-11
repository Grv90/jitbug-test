'use strict';

/**
 * @ngdoc overview
 * @name jitbugTestApp
 * @description
 * # jitbugTestApp
 *
 * Main module of the application.
 */
angular
  .module('jitbugTestApp', [
    'jitbugTestApp.services',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'smart-table',
    'mwl.calendar',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
