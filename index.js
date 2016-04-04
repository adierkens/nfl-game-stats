'use strict';
var FFNerd = require('fantasy-football-nerd');
var _ = require('lodash');
var request = require('request');
var teamIDs = require('./teamID.js');
var moment = require('moment');

const rateLimit = 750; // ms
var lastSent = 0;

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
        if (json && json.scoring_plays) {
          _.each(json.scoring_plays, function(play) {
              delete play._state;   
          });
        }
        return json;
    }

    _sendRequest(url, callback) {
        var self = this;
        var now = moment().valueOf();

        if ((now - lastSent) < rateLimit) {
            setTimeout(function() {
                self._sendRequest(url, callback);
            }, rateLimit);
        } else {
            callback = callback || function () {};
            lastSent = now;
            request(url, function (err, response, body) {
                try {
                    var json = JSON.parse(body);
                    json = self._sanitize(json.objects[0]);
                    callback(json);
                } catch (e) {
                    console.log('Error sending request to ' + url);
                    console.log('Status code ' + response.statusCode);
                    console.log(e);
                    console.log(e.stack)
                }
            });
        }
    }

    _gameStats(gm, callback) {
        var gameCode = gm.gameDate.replace(/-/g, '') + this._getTeamID(gm.homeTeam);
        this._sendRequest(this._generateURL(gameCode), callback);
    }

    player(nm, wk, callback) {
        if (arguments.length == 1) {
           callback({});
        } else if (arguments.length == 2) {
           callback = wk;
           wk = null;
        }

        if (wk) {
        
        } else {
        
        }
    }

    team(tm, wk, callback) {
        if (arguments.length == 1) {
            callback({});
        } else if (arguments.length == 2) {
            callback = wk;
            wk = null;
        }
       
        var self = this; 
        tm = teamIDs.normalizeTeamName(tm);

        if (wk) {
            var wk_games = this.schedule[wk];
            _.each(wk_games, function(gm) {
                if (gm.awayTeam == tm || gm.homeTeam == tm) {
                    self._gameStats(gm, callback);
                }           
            });       
        } else {
            var responses_in_flight = 0;
            var responses = [];
            
            _.each(this.schedule, function(gms, wk) {
                _.each(gms, function(gm) {
                    if (gm.awayTeam == tm || gm.homeTeam == tm) {
                        responses_in_flight += 1;
                        self._gameStats(gm, function(stats) {
                            responses.push(stats);
                            if (responses_in_flight == 1) {
                                callback(responses);
                            }
                            responses_in_flight -= 1;
                        });
                    }
                });
            });
        }
    }

    week(wk, callback) {
        if (arguments.length != 2) {
            callback({});
        }

        var responses_in_flight = 0;
        var responses = [];

        var self = this;
        var wk_games = this.schedule[wk];
        _.each(wk_games, function (gm) {
            responses_in_flight += 1;
            try {
                self._gameStats(gm, function (stats) {
                    responses.push(stats);
                    if (responses_in_flight == 1) {
                        callback(responses);
                    }
                    responses_in_flight -= 1;
                });
            } catch (e) {
                console.log('Error getting info for week ' + wk + ' gm');
                console.log(gm);
            }
        });
    }
}

module.exports = NFLGameStats;
