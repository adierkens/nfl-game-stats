'use strict';
var FFNerd = require('fantasy-football-nerd');
var _ = require('lodash');
var request = require('request');
var teamIDs = require('teamID.js');

class NFLGameStats {
    constructor(options) {
        var default_options = {
            url: 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/',
            format: 'json'
        }
        this.options = _.assign(default_options, options);
        this.ffNerd = new FFNerd(options);
        this.schedule = {};
        this.ffNerd.schedule(function(schedule) {
            var schedule = schedule.Schedule;
            _.each(schedule, function(game) {
                var wk = parseInt(game.gameWeek, 10);
                if (!schedule[wk]) {
                    schedule[wk] = [];
                }
                schedule[wk].push(game);
            });
        });
    }

    _getTeamID(teamName) {
        return teamIDs.getIDForTeam(teamName);
    }

    _getGameCode(year, month, day, teamID) {
        if (arguments.length == 2) {
            return year + month;
        }

        function fNum(num) {
            return ("0" + num).slice(-2);
        }
        return year + fNum(month) + fNum(day) + teamID;
    }

    _generateURL(game_code) {
        return this.options.url + '?format=' + this.options.format + '&game_code=' + game_code;
    }

    _sendRequest(url, callback) {
        callback = callback || function(){};
        request(url, function(err, response, body) {
            callback(JSON.parse(body));
        });
    }

    _gameStats(gm, callback) {
        var gameCode = gm.gameDate.replace('-', '') + this._getTeamID(gm.homeTeam);
        this._sendRequest(this._generateURL(gameCode), callback);
    }

    player(nm, wk, callback) {
    
    }

    team(tm, wk, callback) {
        if (arguments.length == 1) {
            callback({});
        } else if (arguments.length == 2) {
            callback = wk;
            wk = null;
        }
        
        tm = teamIDs.normalizeTeamName(tm);
        
        if (wk) {
            var wk_games = this.schedule[wk];
            _.each(wk_games, function(gm) {
                if (gm.awayTeam == tm || gm.homeTeam == tm) {
                    this._gameStats(gm, callback);
                }           
            });       
        } else {
        
        }
    }

    week(wk, callback) {
       
    }
}

module.exports = NFLGameStats;
