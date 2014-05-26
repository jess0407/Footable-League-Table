'use strict';

angular
  .module('angularAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'underscore',
    'moment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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