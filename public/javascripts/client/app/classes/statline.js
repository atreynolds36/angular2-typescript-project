/**
 * Created by areynolds2 on 11/23/2016.
 */
"use strict";
var Statline = (function () {
    function Statline() {
        this.fgm = 0;
        this.fga = 0;
        this.fta = 0;
        this.ftm = 0;
        this.tpm = 0;
        this.pts = 0;
        this.rbs = 0;
        this.ast = 0;
        this.blk = 0;
        this.stl = 0;
        this.tov = 0;
        this.ftpct = '0';
        this.fgpct = '0';
    }
    Statline.prototype.push = function (stats) {
        for (var key in stats) {
            if (typeof this[key] != 'function') {
                this[key] += stats[key];
            }
        }
        this.calcPercentages();
    };
    Statline.prototype.calcPercentages = function () {
        if (this.fta != 0) {
            this.ftpct = this.ftm / this.fta; //( this.ftm / this.fta ) * 100;
        }
        if (this.fga != 0) {
            this.fgpct = this.fgm / this.fga; // ( this.fgm / this.fga ) * 100
        }
    };
    return Statline;
}());
exports.Statline = Statline;
//# sourceMappingURL=statline.js.map