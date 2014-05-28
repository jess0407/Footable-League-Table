'use strict';

angular.module('angularAppApp')
  .service('Footballdata', function Footballdata($http, Datahandle) {
    
      //getting data from source
      var self = this;
      var handle = function(data){
              
              self.matches = Datahandle.getMatches(data);
              self.dates = Datahandle.dates;
              //get result on this day.
              self.getResults = function(day){
                return Datahandle.getResults(day, data);
              };
              self.getTable = function(day){
                return Datahandle.getTable(day,self.teams,data);
              };

      };

      
        $http.get('/data/teams.json').success(function(data) {
  			   		self.teams = data;
            });
             
  			$http.get('/data/matches.json').success(function(data) {
              handle(data);

            });
        
	   

  });
