'use strict';

angular.module('angularAppApp')
  .service('Footballdata', function Footballdata($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      //getting data from source
      var self = this;
      $http.get('/data/teams.json')
      		 .success(function(data) {
			   		self.teams = data;
			   		$http.get('/data/matches.json').success(function(data) {
			    		self.matches = data;

					});
   				});
	   	

  });
