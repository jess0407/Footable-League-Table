'use strict';

angular.module('angularAppApp')
  .service('Datahandle', function Datahandle(_,moment) {
 	
 	// turn date value to moment object. set this.dates
  	this.getMatches = function(matches){
  		var dates = _.uniq(_.pluck(matches, 'date'));
  		this.dates = _.map(dates, function(date){
			          return moment(date, 'DD/MM/YY');
			      });
  		return _.map(matches, function(obj){
		        obj.date = moment(obj.date,'DD/MM/YY');
		        return obj;
		      });
  	};
  
    //get results on a given day.
   	this.getResults = function(day, matches){
   		return  _.filter (matches, function(match){		
  				return match.date.isSame(day);
  		});
   	};

   	var listFilter = function(matches,key,val){
  		return _.filter(matches, function(match){
  				return match[key] === val;
  		});
  	};


   	this.staMaker = function(matches, id){
			var homeMatches = listFilter(matches,'homeTeamId',id);
			var awayMatches = listFilter(matches,'awayTeamId',id);
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
		 	//filter matches by a date
  		var filterMatchByDate = function(matches,date){
	  		return _.filter (matches, function(match){
	  				return match.date.isSame(date)||match.date.isBefore(date); 	
	  		});
  		};

		//require a date,  generate a table of team statistics based on arregated data.
		this.getTable = function(date, teams, matches){
			var table =[];
  			var list = filterMatchByDate(matches,date);
  		
  			for (var t = 0; t < teams.length; t++) {
	  		 var	teamsta = this.staMaker(list, teams[t].id);
	  		 teamsta.name = teams[t].name;
	  		 table.push(teamsta);	
	  		}
	  		table = _.sortBy(table, function(obj){
	  			return obj.Pts;
	  		}).reverse();
	  		
	  		return table;

		};
	
 
    
  });
   	
