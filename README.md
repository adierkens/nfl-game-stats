# nfl-game-stats
> NFL game statistics

[![Build Status](https://travis-ci.org/adierkens/nfl-game-stats.svg?branch=master)](https://travis-ci.org/adierkens/nfl-game-stats)

A node module which provides game and player stats for nfl games. It relies on [FantasyFootballNerd's](http://www.fantasyfootballnerd.com/fantasy-football-api) free api, and the [Washington Post Sports API](http://apps.washingtonpost.com/sports/stats/nfl/games/this-week/)

## Usage

The only pre-req is to grab an api key from [fantasy football nerd](http://www.fantasyfootballnerd.com/fantasy-football-api). It's the quickest way to grab the season schedule of games. If I find a better way, or one that doesn't require signing up for anything, I'll use that instead. 

Getting started is super simple. First add the npm package:
``` npm install --save nfl-game-stats ```

Then in your js:
```js

var NFLStats = require('nfl-game-stats');

var stats = new NFLStats({ api_key: '<API_KEY>',
                           onReady: function() {
                               console.log("Ready");
                           });


```

## API


## TODO
