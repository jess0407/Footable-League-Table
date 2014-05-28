'use strict';

angular.module('angularAppApp')
  .controller('MainCtrl', function (_, $scope, $http, moment, $document,d3, Footballdata) {
    //data publish to dom are [day, teams, matches, table, res (result on day)]

    //initilize the app, reading data from Footballdata service.
   
  	$scope.day = -1;

    var init = function(){
      //pluck out array of unique match dates, and make them moment objects.
      var dates = _.uniq(_.pluck(Footballdata.matches, 'date'));
      $scope.dates = _.map(dates, function(date){
          return moment(date, 'DD/MM/YY');
      });
      // turn date value to moment object.
      $scope.matches = _.map(Footballdata.matches, function(obj){
        obj.date = moment(obj.date,'DD/MM/YY');
        return obj;
      });

      $scope.teams = Footballdata.teams;

    };
    
   
  	$scope.prev = function(){
  		if(($scope.day-1)>=0){
  			$scope.day-=1;
  			$scope.generateTable($scope.dates[$scope.day], $scope.teams,$scope.matches);
  			$scope.getMatchesOnDate($scope.matches,$scope.dates[$scope.day]);

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
  			$scope.generateTable($scope.dates[$scope.day], $scope.teams,$scope.matches);
  			$scope.getMatchesOnDate($scope.matches,$scope.dates[$scope.day]);
  		}
  	};


  	$document.keydown(function(e){
  		if(e.keyCode===39){
  			angular.element('#right').trigger('click');
  			
  		}
  		if(e.keyCode===37){
  			angular.element('#left').trigger('click');
  			
  		}
  	
  	});
  	//this will generate an array of object contains all the team statistics and thier position.
  	//it takes a moment date and a list of teams and will return the relevant data up to the date
  	$scope.generateTable=function(date, teams, matches){
  		
  		var table =[];
  		var list = $scope.filterMatchByDate(matches,date);
  		
  		for (var t = 0; t < teams.length; t++) {
	  		 var	teamsta = $scope.staMaker(list, teams[t].id);
	  		 teamsta.name = teams[t].name;
	  		 table.push(teamsta);	
  		}
  		table = _.sortBy(table, function(obj){
  			return obj.Pts;
  		}).reverse();
  		
  		$scope.table = table;
  		
  	};
  	//filter matches on a date
  	$scope.getMatchesOnDate = function(matches,date){
  		$scope.res = _.filter (matches, function(match){		
  				return match.date.isSame(date);
  		});
  		
  	};  	
  	//filter matches by a date
  	$scope.filterMatchByDate = function(matches,date){
  		return _.filter (matches, function(match){
  				return match.date.isSame(date)||match.date.isBefore(date); 	
  		});
  	};
  	// this function take a list, a key and a value to filter a subset of the list.
  	$scope.listFilter = function(matches,key,val){
  		return _.filter(matches, function(match){

  				return match[key] === val;
  		});
  	};

  	//this function take a list of matches and a team id to return the team statitiscs.
		$scope.staMaker = function(matches, id){
			var homeMatches = $scope.listFilter(matches,'homeTeamId',id);
			var awayMatches = $scope.listFilter(matches,'awayTeamId',id);
			var count = homeMatches.length + awayMatches.length;
			//option to be 'w' for win, 'l' for lost
			var wlCounter = function(option){
				var hc = _.filter(homeMatches, function(match){
							 if (option==='w') {return match.homeGoals > match.awayGoals;}
							 if (option==='l') {return match.homeGoals < match.awayGoals;}
	  			}).length;	
	  		var ac =	_.filter(awayMatches, function(match){
							 if (option==='w') {return match.homeGoals < match.awayGoals;}
							 if (option==='l') {return match.homeGoals > match.awayGoals;}
	  			}).length;		

  			return ac+hc;
			};
			var winCount = wlCounter('w');
			var loseCount =wlCounter('l');
			var drawCount = count-winCount-loseCount;
			
			var fgoals = _.union(_.pluck(homeMatches, 'homeGoals'), _.pluck(awayMatches,'awayGoals'));
			var fVal = 0;
			for (var i = 0; i < fgoals.length; i++) {
				fVal += parseInt(fgoals[i]);
			}
			
			var agoals = _.union(_.pluck(homeMatches, 'awayGoals'), _.pluck(awayMatches,'homeGoals'));
			var aVal = 0;
			for (var j = 0; j < agoals.length; j++) {
				aVal += parseInt(agoals[j]);
			}

			var gd = fVal - aVal;
			var pts = 3*winCount + drawCount;

			return {
  					P:count,
  					W:winCount,
  					D:drawCount,
  					L:loseCount,
  					F:fVal,
  					A:aVal,
  					GD:gd,
  					Pts:pts
  				}; 
		};
	

  });
