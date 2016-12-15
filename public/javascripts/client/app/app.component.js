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
 * Created by areynolds2 on 11/20/2016.
 */
var core_1 = require('@angular/core');
var app_constants_1 = require('./shared/app-constants');
var team_1 = require('./classes/team');
var player_1 = require('./classes/player');
var rest_service_1 = require('./services/rest-service');
var AppComponent = (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.title = 'Matchup Page';
        this.stat_categories = app_constants_1.APP_CONSTANTS.stat_categories;
        this.team1 = new team_1.Team('Andrews Team');
        this.team2 = new team_1.Team('Opponents Team');
        this.initTeam(this.team1, app_constants_1.APP_CONSTANTS.ANDREW_TEAM);
        this.initTeam(this.team2, app_constants_1.APP_CONSTANTS.OTHER_TEAM);
        this.projection_generated = false;
        this.projectionEvent = new core_1.EventEmitter();
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.initTeam = function (team, players) {
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            team.addPlayer(player);
        }
    };
    AppComponent.prototype.generateTeamProjection = function () {
        //If projection already generated - do not do it again
        if (this.projection_generated) {
            return;
        }
        this.projectionEvent.emit();
        this.projection_generated = true;
        this.team1.projection_loading = true;
        this.team2.projection_loading = true;
        for (var _i = 0, _a = this.team1.players; _i < _a.length; _i++) {
            var player = _a[_i];
            this.getPlayerWeeklyProjection(player, this.team1);
        }
        for (var _b = 0, _c = this.team2.players; _b < _c.length; _b++) {
            var player = _c[_b];
            this.getPlayerWeeklyProjection(player, this.team2);
        }
    };
    AppComponent.prototype.getPlayerWeeklyProjection = function (player, team) {
        if (!player.cut && !player.injured) {
            this.dataService.fetchPlayerWeeklyProjection(player)
                .subscribe(function (stats) {
                player.loadProjectedStats(stats);
                team.addPlayerStatsToTotal(stats);
            }, function (error) { return console.log(error); });
        }
    };
    AppComponent.prototype.replacePlayer = function (p) {
        this.replacementPlayer = p;
    };
    AppComponent.prototype.setReplacementPlayer = function (p) {
        this.replacementPlayer = p;
    };
    __decorate([
        core_1.HostListener('replace_player_event'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [player_1.Player]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "replacePlayer", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            //template: '<h1>Hello Angular!</h1>'
            templateUrl: 'templates/main.html',
            providers: [rest_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [rest_service_1.DataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map