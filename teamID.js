var _ = require('lodash');

var master_list = {
    ARI: {
        alias: 'Arizona Cardinals'
        id: '022'
    },
    ATL: {
        alias 'Atlanta Falcons',
        id: '001'
    },
    BAL: {
        aliases: 'Baltimore Ravens',
        id: '033'
    },
    BUF: {
        alias: 'Buffalo Bills',
        id: ''
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
        id: ''
    },
    GB: {
        alias: 'Green Bay Packers',
        id: ''
    },
    HOU: {
        alias: 'Houston Texans',
        id: '034'
    },
    IND: {
        alias: 'Indianapolis Colts',
        id: ''
    },
    JAC: {
        alias: 'Jacksonville Jaguars',
        id: ''
    },
    KC: {
        alias: 'Kansas City Chiefs',
        id: '012'
    },
    MIA: {
        alias: 'Miami Dolphins',
        id: ''
    },
    MIN: {
        alias: 'Minnesota Vikings',
        id: ''
    },
    NYG: {
        alias: 'NY Giants',
        id: ''
    },
    NYJ: {
        alias: 'NY Jets',
        id: ''
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
        id: ''
    },
    PIT: {
        alias: 'Pittsburgh Steelers',
        id: '023'
    },
    SD: {
        alias: 'San Diego Chargers',
        id: ''
    },
    SF: {
        alias: 'San Francisco 49ers',
        id: ''
    },
    SEA: {
        alias: 'Seattle Seahawks',
        id: ''
    },
    STL: {
        alias: 'St. Louis Rams',
        id: '014'
    },
    TB: {
        alias: 'Tampa Bay Buccaneers',
        id: ''
    },
    TEN: {
        alias: 'Tennessee Titans',
        id: ''
    },
    WAS: {
        alias: 'Washington Redskins',
        id: ''
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
    getIDForTeam: getIDForTeam,,
    normailzeTeamName: normailzeTeamName
}
