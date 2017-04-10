"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rating = (function () {
    function Rating() {
        this.updateRate = new core_1.EventEmitter();
        this.range = [1, 2, 3, 4, 5];
        this.readOnly = false;
    }
    Rating.prototype.update = function (value) {
        if (!this.readOnly) {
            this.rate = value;
            this.updateRate.next(value);
        }
    };
    return Rating;
}());
Rating = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'rating',
        template: "\n    <span tabindex=\"0\">\n      <template ngFor let-item [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < rate ? '*' : ' ' }})</span>\n        <i class=\"glyphicon\" (click)=\"update(index + 1)\"\n           [ngClass]=\"index < rate ? 'glyphicon-star' : 'glyphicon-star-empty'\"></i>\n      </template>\n    </span>\n  ",
        inputs: ['rate', 'readOnly'],
        outputs: ['updateRate: rateChange']
    })
], Rating);
exports.Rating = Rating;
//# sourceMappingURL=rating.component.js.map