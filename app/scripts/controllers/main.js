'use strict';

angular.module('angularAppApp')
  .controller('MainCtrl', function ( $scope, $document,Footballdata) {
    //data publish to dom are [day, teams, matches, table, res (result on day)]

    //initilize the app, reading data from Footballdata service.

  	$scope.day = -1;

    var init = function(){
    
      $scope.dates = Footballdata.dates;
      $scope.matches = Footballdata.matches;
      $scope.teams = Footballdata.teams;
      
     
    };
    //listen to key event
    $document.keydown(function(e){
      if(e.keyCode===39){
        angular.element('#right').trigger('click');
        
      }
      if(e.keyCode===37){
        angular.element('#left').trigger('click');
        
      }
    
    });
   
  	$scope.prev = function(){
  		if(($scope.day-1)>=0){
  			$scope.day-=1;
        $scope.table = Footballdata.getTable($scope.dates[$scope.day]);
        $scope.res = Footballdata.getResults($scope.dates[$scope.day]);
  		}
  	};
  	$scope.next = function(){
  		if($scope.day === -1){
  		  //console.log($scope.matches);
        init();
  			angular.element('.wrap').removeClass('hide');
  			angular.element('.welcome').slideUp('slow');
  		}
  		if(($scope.day+1)<$scope.dates.length){
  			$scope.day+=1;
  		  $scope.table = Footballdata.getTable($scope.dates[$scope.day]);
        $scope.res = Footballdata.getResults($scope.dates[$scope.day]);
        
  		}
  	};


  	

  });
