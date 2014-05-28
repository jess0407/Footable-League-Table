'use strict';

angular.module('angularAppApp')
  .controller('D3visualCtrl', function ($scope, Footballdata, d3, moment, _) {

    //util function to get essential data for the graph
    var reduce = function(arr){
      var reduced = [];
      for(var j =0 ; j<arr.length; j++){
        var pos = j+1;
        var name = arr[j].name;
        reduced.push({pos:pos, name:name});
      }
      return reduced;
    };

    var init = function(){
    	$scope.teams=Footballdata.teams;
    	var dates=Footballdata.dates;
      var dayPoints = _.filter(dates, function(day){
       return day.format('ddd')==='Mon';
     
      });
      //a collection of objects with week, name and position
      var performance =[];
      for (var i = 0; i < dayPoints.length; i++) {
        
        var day = dayPoints[i];
        var modifiedArray = reduce(Footballdata.getTable(day));
        var res = {data:modifiedArray};
        res.week = i+1;
        res.range = day.add('days',1).format('ddd, DD/MM/YY')+' to '+day.add("days",6).format('ddd, DD/MM/YY');
        if(i===0){
          res.range = dates[0].format('ddd, DD/MM/YY')+' to '+day.format('ddd, DD/MM/YY');
          performance.push(res);
        }else if(i===(dayPoints.length-1)){
          res.data=reduce(Footballdata.getTable(dates[dates.length-1]));
          res.range = 'Tue, 08/05/12'+' to '+ dates[dates.length-1].format('ddd, DD/MM/YY');
          performance.push(res);
        }else{     
          performance.push(res);
        }

        
      }//end of for loop

      //initilized data ready for d3
      //week,data(20 teams position) and range
      $scope.d3data = performance;

    
    
    };// end of init

  
       
  	
  	$scope.test = function(){
  		init();
      $scope.teams = _.sortBy($scope.teams, 'name');
      
  	};
  	

    
  });
