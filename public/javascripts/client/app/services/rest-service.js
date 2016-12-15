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
var statline_1 = require('../classes/statline');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/catch');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.fetchPlayerWeeklyStats = function (p) {
        return this.http.get('/connect/getPlayerWeeklyStats?' + this.formURLString(p))
            .map(this.successHandleWeeklyStats)
            .catch(this.handleError);
    };
    DataService.prototype.successHandleWeeklyStats = function (res) {
        var body = res.json();
        console.log(body);
        var temp_statline = new statline_1.Statline();
        temp_statline.pts = body.PTS;
        temp_statline.rbs = body.RB;
        temp_statline.ast = body.AST;
        temp_statline.fgm = body.FGM;
        temp_statline.fga = body.FGA;
        temp_statline.tpm = body.TPM;
        temp_statline.fta = body.FTA;
        temp_statline.ftm = body.FTM;
        temp_statline.tov = body.TOV;
        temp_statline.stl = body.STL;
        temp_statline.blk = body.BLK;
        return temp_statline;
    };
    DataService.prototype.fetchPlayerWeeklyProjection = function (p) {
        return this.http.get('/connect/getPlayerStats?' + this.formURLString(p))
            .map(this.successHandleWeeklyProjection)
            .catch(this.handleError);
    };
    DataService.prototype.successHandleWeeklyProjection = function (res) {
        var body = res.json();
        var weekly_games = body.wk_games;
        var temp_statline = new statline_1.Statline();
        temp_statline.pts = body.PTS * weekly_games;
        temp_statline.rbs = body.RB * weekly_games;
        temp_statline.ast = body.AST * weekly_games;
        temp_statline.fgm = body.FGM * weekly_games;
        temp_statline.fga = body.FGA * weekly_games;
        temp_statline.tpm = body.TPM * weekly_games;
        temp_statline.fta = body.FTA * weekly_games;
        temp_statline.ftm = body.FTM * weekly_games;
        temp_statline.tov = body.TOV * weekly_games;
        temp_statline.stl = body.STL * weekly_games;
        temp_statline.blk = body.BLK * weekly_games;
        return temp_statline;
    };
    DataService.prototype.formURLString = function (p) {
        var player_names = p.name.split(' ');
        var generic_url_param = 'fName=' + player_names[0] + '&lName=' + player_names[1] + '&team=' + p.team;
        if (p.cut) {
            generic_url_param += "&cutdate=" + p.cutdate;
        }
        if (p.added) {
            generic_url_param += "&adddate=" + p.addeddate;
        }
        return generic_url_param;
    };
    DataService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=rest-service.js.map