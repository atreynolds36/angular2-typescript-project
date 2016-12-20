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
 * Created by areynolds2 on 12/7/2016.
 */
var core_1 = require('@angular/core');
var app_constants_1 = require('../shared/app-constants');
var Player_1 = require('../classes/Player');
var rest_service_1 = require('../services/rest-service');
var MyModalComponent = (function () {
    function MyModalComponent(ds) {
        this.ds = ds;
        this.stat_categories = app_constants_1.APP_CONSTANTS.stat_categories;
        this.analysis_run = false;
    }
    Object.defineProperty(MyModalComponent.prototype, "teams", {
        set: function (obj) {
            this.team1 = obj.one;
            this.team2 = obj.two;
        },
        enumerable: true,
        configurable: true
    });
    MyModalComponent.prototype.ngOnInit = function () { };
    MyModalComponent.prototype.runAnalysis = function () {
        var _this = this;
        this.inputPlayer = new Player_1.Player(this.firstname + " " + this.lastname, this.team);
        this.ds.fetchPlayerWeeklyProjection(this.inputPlayer)
            .subscribe(function (stats) {
            _this.analysis_run = true;
            _this.inputPlayer.loadProjectedStats(stats);
            _this.team1.swapStats(stats, _this.replacementPlayer.projected_statline);
        }, function (error) {
            alert('Could not find player');
        });
    };
    MyModalComponent.prototype.ngOnDestroy = function () {
        console.log('destroyed');
    };
    __decorate([
        core_1.Input('replacePlayer'), 
        __metadata('design:type', Player_1.Player)
    ], MyModalComponent.prototype, "replacementPlayer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], MyModalComponent.prototype, "teams", null);
    MyModalComponent = __decorate([
        core_1.Component({
            selector: '<my-modal-component',
            templateUrl: '../templates/modal-component.html',
            providers: [rest_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [rest_service_1.DataService])
    ], MyModalComponent);
    return MyModalComponent;
}());
exports.MyModalComponent = MyModalComponent;
//# sourceMappingURL=modal-component.js.map