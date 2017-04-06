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
var EventZippyComponent = (function () {
    function EventZippyComponent(_eventService) {
        this._eventService = _eventService;
        this._myComment = "";
        this.comments = [];
        this.commentParam = {
            uid: "",
            eid: "",
            body: "",
            rating: ""
        };
    }
    EventZippyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userObj = JSON.parse(localStorage.getItem('currentUser'));
        this._eventService.getComments(this._eventId).subscribe(function (data) {
            _this.comments = data;
            console.log(data);
        }, function (error) {
            console.log("Error: " + error);
        });
    };
    EventZippyComponent.prototype.submit = function () {
        var _this = this;
        var comment = {
            uid: this.userObj._id,
            eid: this._eventId,
            body: this.commentParam.body,
            rating: '4'
        };
        console.log(comment);
        this._eventService.postComments(comment).subscribe(function (data) {
            _this.ngOnInit();
        }, function (error) {
            console.log("Error: " + error);
        });
    };
    return EventZippyComponent;
}());
__decorate([
    core_1.Input('eventId'),
    __metadata("design:type", String)
], EventZippyComponent.prototype, "_eventId", void 0);
EventZippyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event-zippy',
        templateUrl: 'event-zippy.component.html'
    }),
    __metadata("design:paramtypes", [index_1.EventService])
], EventZippyComponent);
exports.EventZippyComponent = EventZippyComponent;
//# sourceMappingURL=event-zippy.component.js.map