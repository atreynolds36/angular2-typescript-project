"use strict";
/**
 * Created by areynolds2 on 11/23/2016.
 */
var statline_1 = require('./statline');
var Team = (function () {
    function Team(name) {
        this.name = name;
        this.weekly_stats = new statline_1.Statline();
        this.players = [];
        this.projection_loading = false;
    }
    Team.prototype.addPlayer = function (p) {
        this.players.push(p);
    };
    Team.prototype.addPlayerStatsToTotal = function (stats) {
        this.weekly_stats.push(stats);
    };
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=team.js.map