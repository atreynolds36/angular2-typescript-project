"use strict";
/**
 * Created by areynolds2 on 11/23/2016.
 */
var statline_1 = require('./statline');
var Player = (function () {
    function Player(name, team, inj) {
        this.name = name;
        this.team = team;
        this.inj = inj;
        this.weekly_stats = new statline_1.Statline();
        this.cut = false;
        this.added = false;
        this.injured = inj;
        this.stats_loaded = false;
        this.projection_loaded = false;
        this.projected_statline = new statline_1.Statline();
    }
    Player.prototype.setCutDate = function (date) {
        this.cut = true;
        this.cutdate = date;
    };
    Player.prototype.setAddedDate = function (date) {
        this.added = true;
        this.addeddate = date;
    };
    Player.prototype.loadWeeklyStats = function (stats) {
        for (var key in stats) {
            if (typeof this.weekly_stats[key] != 'function') {
                this.weekly_stats[key] += stats[key];
            }
        }
        this.weekly_stats.calcPercentages();
        this.stats_loaded = true;
    };
    Player.prototype.loadProjectedStats = function (stats) {
        for (var key in stats) {
            if (typeof this.projected_statline[key] != 'function') {
                this.projected_statline[key] += stats[key];
            }
        }
        this.projected_statline.calcPercentages();
        this.projection_loaded = true;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map