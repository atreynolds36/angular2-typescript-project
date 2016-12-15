"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by areynolds2 on 12/5/2016.
 */
var core_1 = require('@angular/core');
var ScoreTracker = (function () {
    function ScoreTracker() {
        this.score = 'Score : 0-0';
        this.detect_changes_andrew = 0;
        this.detect_changes_oppo = 0;
        this.categories_for = 0;
        this.categories_against = 0;
        this.categories_tie = 0;
    }
    /*
        On change to statline - update scoreboard
     */
    ScoreTracker.prototype.ngDoCheck = function () {
        if (this.detect_changes_andrew != this.andrew_statline.fga ||
            this.detect_changes_oppo != this.oppo_statline.fga) {
            this.detect_changes_andrew = this.andrew_statline.fga;
            this.detect_changes_oppo = this.oppo_statline.fga;
            this.initScoreboard();
            this.compareStatLines(this.andrew_statline.fgpct, this.oppo_statline.fgpct);
            this.compareStatLines(this.andrew_statline.ftpct, this.oppo_statline.ftpct);
            this.compareStatLines(this.andrew_statline.tpm, this.oppo_statline.tpm);
            this.compareStatLines(this.andrew_statline.pts, this.oppo_statline.pts);
            this.compareStatLines(this.andrew_statline.rbs, this.oppo_statline.rbs);
            this.compareStatLines(this.andrew_statline.ast, this.oppo_statline.ast);
            this.compareStatLines(this.andrew_statline.stl, this.oppo_statline.stl);
            this.compareStatLines(this.andrew_statline.blk, this.oppo_statline.blk);
            this.compareStatLines(this.oppo_statline.tov, this.andrew_statline.tov);
            this.score += this.categories_for + "-" + this.categories_against;
            if (this.categories_tie) {
                this.score += this.categories_tie;
            }
        }
    };
    ScoreTracker.prototype.initScoreboard = function () {
        this.score = 'Score : ';
        this.categories_for = 0;
        this.categories_against = 0;
        this.categories_tie = 0;
    };
    ScoreTracker.prototype.compareStatLines = function (stat1, stat2) {
        if (stat1 > stat2) {
            this.categories_for++;
        }
        else if (stat1 < stat2) {
            this.categories_against++;
        }
        else {
            this.categories_tie++;
        }
    };
    __decorate([
        core_1.Input('team1Stats'), 
        __metadata('design:type', Object)
    ], ScoreTracker.prototype, "andrew_statline", void 0);
    __decorate([
        core_1.Input('team2Stats'), 
        __metadata('design:type', Object)
    ], ScoreTracker.prototype, "oppo_statline", void 0);
    ScoreTracker = __decorate([
        core_1.Component({
            selector: 'my-score-tracker',
            template: "<h1>{{score}}</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], ScoreTracker);
    return ScoreTracker;
}());
exports.ScoreTracker = ScoreTracker;
//# sourceMappingURL=ScoreTracker.js.map