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
 * Created by areynolds2 on 12/3/2016.
 */
var core_1 = require('@angular/core');
var CategoryBackgroundColor = (function () {
    function CategoryBackgroundColor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        // el.nativeElement.style.backgroundColor = 'yellow';
        //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
    Object.defineProperty(CategoryBackgroundColor.prototype, "teamStatLeader", {
        set: function (data) {
            if (data.myStat > data.othStat) {
                this.el.nativeElement.style.backgroundColor = '#dff0d8';
            }
            else {
                this.el.nativeElement.style.backgroundColor = '#f5f5f5';
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('teamStatLeader'), 
        __metadata('design:type', Object)
    ], CategoryBackgroundColor.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CategoryBackgroundColor.prototype, "teamStatLeader", null);
    CategoryBackgroundColor = __decorate([
        core_1.Directive({
            selector: '[teamStatLeader]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], CategoryBackgroundColor);
    return CategoryBackgroundColor;
}());
exports.CategoryBackgroundColor = CategoryBackgroundColor;
//# sourceMappingURL=matchup-directives.js.map