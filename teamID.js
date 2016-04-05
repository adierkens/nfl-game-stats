'use strict';
var _ = require('lodash');

var master_list = {
    ARI: {
        alias: 'Arizona Cardinals',
        id: '022'
    },
    ATL: {
        alias: 'Atlanta Falcons',
        id: '001'
    },
    BAL: {
        alias: 'Baltimore Ravens',
        id: '033'
    },
    BUF: {
        alias: 'Buffalo Bills',
        id: '002'
    },
    CAR: {
        alias: 'Carolina Panthers',
        id: '029'
    },
    CHI: {
        alias: 'Chicago Bears',
        id: '003'
    },
    CIN: {
        alias: 'Cincinnati Bengals',
        id: '004'
    },
    CLE: {
        alias: 'Cleveland Browns',
        id: '005'
    },
    DAL: {
        alias: 'Dallas Cowboys',
        id: '006'
    },
    DEN: {
        alias: 'Denver Broncos',
        id: '007'
    },
    DET: {
        alias: 'Detroit Lions',
        id: '008'
    },
    GB: {
        alias: 'Green Bay Packers',
        id: '009'
    },
    HOU: {
        alias: 'Houston Texans',
        id: '034'
    },
    IND: {
        alias: 'Indianapolis Colts',
        id: '011'
    },
    JAC: {
        alias: 'Jacksonville Jaguars',
        id: '030'
    },
    KC: {
        alias: 'Kansas City Chiefs',
        id: '012'
    },
    MIA: {
        alias: 'Miami Dolphins',
        id: '015'
    },
    MIN: {
        alias: 'Minnesota Vikings',
        id: '016'
    },
    NYG: {
        alias: 'NY Giants',
        id: '019'
    },
    NYJ: {
        alias: 'NY Jets',
        id: '020'
    },
    NE: {
        alias: 'New England Patriots',
        id: '017'
    },
    NO: {
        alias: 'New Orleans Saints',
        id: '018'
    },
    OAK: {
        alias: 'Oakland Raiders',
        id: '013'
    },
    PHI: {
        alias: 'Philadelphia Eagles',
        id: '021'
    },
    PIT: {
        alias: 'Pittsburgh Steelers',
        id: '023'
    },
    SD: {
        alias: 'San Diego Chargers',
        id: '024'
    },
    SF: {
        alias: 'San Francisco 49ers',
        id: '025'
    },
    SEA: {
        alias: 'Seattle Seahawks',
        id: '026'
    },
    STL: {
        alias: 'St. Louis Rams',
        id: '014'
    },
    TB: {
        alias: 'Tampa Bay Buccaneers',
        id: '027'
    },
    TEN: {
        alias: 'Tennessee Titans',
        id: '010'
    },
    WAS: {
        alias: 'Washington Redskins',
        id: '028'
    }
}

var teamIDs = {};
var teamNames = {};

_.forEach(master_list, function(val, key) {
    var id = val.id;
    teamIDs[key] = id;
    teamNames[key] = key;
    teamNames[val.alias] = key; 
    teamNames[val.alias.substring(val.alias.lastIndexOf(" ") + 1)] = key;
    teamNames[val.alias.substring(0, val.alias.lastIndexOf(" "))] = key;
});

function normalizeTeamName(team) {
    return teamNames[team];
}

function getIDForTeam(team) {
    return teamIDs[normalizeTeamName(team)];
}

module.exports = {
    getIDForTeam: getIDForTeam,
    normalizeTeamName: normalizeTeamName
}
