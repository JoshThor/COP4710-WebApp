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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EventZippyComponent = (function () {
    function EventZippyComponent() {
        /* TODO:
          - Make http request for comments in this component
          - Have single @Input for eventId to make http request */
        this._comment = "";
    }
    EventZippyComponent.prototype.ngOnInit = function () {
        /* Make http request here */
    };
    return EventZippyComponent;
}());
__decorate([
    core_1.Input('eventId'),
    __metadata("design:type", String)
], EventZippyComponent.prototype, "_id", void 0);
EventZippyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event-zippy',
        template: "\n    <div>\n\n      <div class=\"form-group\"> <!-- *ngFor=\"let comment in comments; i = index\" for <div> element -->\n        <label>\n        Commenter's username\n        <br/>\n        <span class=\"badge\">4 <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span></span>\n        </label>\n        <input type=\"text\" class=\"form-control\" disabled placeholder=\"User's comments...\" />\n      </div>\n\n      <div class=\"form-group\">\n        <label>Current user's username</label>\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"_comment\" placeholder=\"Type your comments here...\" />\n      </div>\n    </div>\n  "
    })
], EventZippyComponent);
exports.EventZippyComponent = EventZippyComponent;
//# sourceMappingURL=event-zippy.component.js.map