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
var index_1 = require("../_services/index");
var ApproveEventsComponent = (function () {
    function ApproveEventsComponent(_eventService) {
        this._eventService = _eventService;
        /* TODO:
          - list of ONLY public and private events
          - only need name and [approve] and [deny] buttons
          - Make eventService call with test data for pending events
          - Make eventService call on test data for approval/disapproval */
        this.publicEvents = [];
        this.privateEvents = [];
    }
    ApproveEventsComponent.prototype.approval = function (value) {
        /* TODO: Make call on eventService to approve/disapprove event */
    };
    ApproveEventsComponent.prototype.ngOnInit = function () {
        this.publicEvents = this._eventService.getPublicEvents(); //.subscribe((rsp) => { console.log(rsp); });
        this.privateEvents = this._eventService.getPrivateEvents(""); //.subscribe((rsp) => { console.log(rsp); });
    };
    return ApproveEventsComponent;
}());
ApproveEventsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'approve-events',
        templateUrl: 'approve-events.component.html'
    }),
    __metadata("design:paramtypes", [index_1.EventService])
], ApproveEventsComponent);
exports.ApproveEventsComponent = ApproveEventsComponent;
//# sourceMappingURL=approve-events.component.js.map