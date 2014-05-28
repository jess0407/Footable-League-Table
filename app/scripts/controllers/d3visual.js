'use strict';

angular.module('angularAppApp')
  .controller('D3visualCtrl', function ($scope, Datahandle) {
    


  	$scope.data=Datahandle.teams;
  	$scope.test = function(){
  		//console.log($scope.data);
  	};
  	

    
  });
