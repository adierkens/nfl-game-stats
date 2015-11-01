'use strict';
var assert = require('chai').assert;
var NFLStats = require('..');

describe('Basic sanity tests', function() {
    it('should return a teams stats for a week', function(done) {
        this.timeout(5000);        
        var stats = new NFLStats({ api_key: 'epatatkbt7kt', onReady: function(){
        stats.team('New England', 8, function(team) {
            assert.deepEqual(team, require('./resources/pats_dolphins_wk_8.json'));
            done();
        });

        }});    
    });
});
