'use strict';

angular
  .module('angularAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'underscore',
    'moment',
    'd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/d3visual', {
        templateUrl: 'views/d3visual.html',
        controller: 'D3visualCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('underscore', [])
.factory('_', function() {
  return window._;
});
angular.module('moment', [])
.factory('moment', function() {
  return window.moment;
});
angular.module('d3', [])
.factory('d3', function() {
  return window.d3;
});