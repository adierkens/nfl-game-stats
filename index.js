'use strict';
var FFNerd = require('fantasy-football-nerd');
var _ = require('lodash');
var request = require('request');
var teamIDs = require('./teamID.js');

class NFLGameStats {
    constructor(options) {
        var default_options = {
            url: 'http://apps.washingtonpost.com/sports/api/nfl/v2/games/',
            format: 'json',
            onReady: function(){}
        }
        this.options = _.assign(default_options, options);
        this.ffNerd = new FFNerd(options);
        this.schedule = [];
        var self = this;
        this.ffNerd.schedule(function(schedule) {
            var schedule = schedule.Schedule;
            _.each(schedule, function(game) {
                var wk = parseInt(game.gameWeek, 10);
                if (!self.schedule[wk]) {
                    self.schedule[wk] = [ game ];
                } else {
                    self.schedule[wk].push(game);
                }
            });
            self.options.onReady();
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

    _sanitize(json) {
        _.each(json.scoring_plays, function(play) {
            delete play._state;   
        });
        return json;
    }

    _sendRequest(url, callback) {
        callback = callback || function(){};
        var self = this;
        request(url, function(err, response, body) {
            var json = JSON.parse(body);
            json = self._sanitize(json.objects[0]);
            callback(json);
        });
    }

    _gameStats(gm, callback) {
        var gameCode = gm.gameDate.replace(/-/g, '') + this._getTeamID(gm.homeTeam);
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
            var self = this;
            _.each(wk_games, function(gm) {
                if (gm.awayTeam == tm || gm.homeTeam == tm) {
                    self._gameStats(gm, callback);
                }           
            });       
        } else {
        
        }
    }

    week(wk, callback) {
       
    }
}

module.exports = NFLGameStats;
