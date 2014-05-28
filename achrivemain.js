// original code on main.js

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
	