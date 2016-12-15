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
 * Created by areynolds2 on 11/23/2016.
 */
var core_1 = require('@angular/core');
var player_1 = require('../classes/player');
var team_1 = require('../classes/team');
var rest_service_1 = require('../services/rest-service');
var PlayerRowComponent = (function () {
    function PlayerRowComponent(dataService) {
        this.dataService = dataService;
        this.analyze = new core_1.EventEmitter();
    }
    PlayerRowComponent.prototype.ngOnChanges = function (changes) {
        console.log('enter onchanges');
    };
    PlayerRowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.fetchPlayerWeeklyStats(this.player)
            .subscribe(function (stats) {
            _this.player.loadWeeklyStats(stats);
            _this.team.addPlayerStatsToTotal(stats);
        }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Input('myPlayer'), 
        __metadata('design:type', player_1.Player)
    ], PlayerRowComponent.prototype, "player", void 0);
    __decorate([
        core_1.Input('projection'), 
        __metadata('design:type', Boolean)
    ], PlayerRowComponent.prototype, "projection_generated", void 0);
    __decorate([
        core_1.Input('myTeam'), 
        __metadata('design:type', team_1.Team)
    ], PlayerRowComponent.prototype, "team", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PlayerRowComponent.prototype, "analyze", void 0);
    PlayerRowComponent = __decorate([
        core_1.Component({
            selector: '[myPlayer]',
            providers: [rest_service_1.DataService],
            templateUrl: '../templates/player-row.html'
        }), 
        __metadata('design:paramtypes', [rest_service_1.DataService])
    ], PlayerRowComponent);
    return PlayerRowComponent;
}());
exports.PlayerRowComponent = PlayerRowComponent;
//# sourceMappingURL=player-row-component.js.map