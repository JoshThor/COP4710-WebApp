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
var FindEventsComponent = (function () {
    function FindEventsComponent(_eventService) {
        this._eventService = _eventService;
        this.publicEvents = [];
        this.privateEvents = [];
        this.rsoEvents = [];
        this.togglePublicEventComments = [];
        this.togglePrivateEventComments = [];
        this.toggleRSOEventComments = [];
    }
    FindEventsComponent.prototype.toggle = function (index, type) {
        /* Public Events */
        if (type == 0) {
            this.togglePublicEventComments[index] = !this.togglePublicEventComments[index];
        }
        /* Private Events */
        if (type == 1) {
            this.togglePrivateEventComments[index] = !this.togglePrivateEventComments[index];
        }
        /* RSO Events */
        if (type == 2) {
            this.toggleRSOEventComments[index] = !this.toggleRSOEventComments[index];
        }
    };
    FindEventsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userObj = JSON.parse(localStorage.getItem("currentUser"));
        var i = 0;
        /* TODO:
          - Add a message stating there are no events if array.length == 0
        */
        this._eventService.getPublicEvents().subscribe(function (data) {
            console.log(data);
            _this.publicEvents = data;
        }, function (error) {
            console.log("ERR");
        });
        for (i = 0; i < this.publicEvents.length; i++) {
            this.togglePublicEventComments.push(false);
        }
        this._eventService.getPrivateEvents(userObj._id).subscribe(function (data) {
            console.log(data);
            _this.privateEvents = data;
            for (var _i = 0, _a = _this.privateEvents; _i < _a.length; _i++) {
                var event_1 = _a[_i];
            }
        }, function (error) {
            console.log("ERR");
        });
        for (i = 0; i < this.privateEvents.length; i++) {
            this.togglePrivateEventComments.push(false);
        }
        this._eventService.getRSOEvents(userObj._id).subscribe(function (data) {
            console.log(data);
            _this.rsoEvents = data;
        }, function (error) {
            console.log("ERR");
        });
        for (i = 0; i < this.rsoEvents.length; i++) {
            this.toggleRSOEventComments.push(false);
        }
    };
    FindEventsComponent.prototype.parseString = function (value) {
        return parseFloat(value);
    };
    FindEventsComponent.prototype.stringToDate = function (string) {
        return new Date(string);
    };
    return FindEventsComponent;
}());
FindEventsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'find-events',
        styles: ["\n   .sebm-google-map-container {\n     height: 300px;\n     width: 300px;\n   }\n"],
        templateUrl: 'find-events.component.html',
    }),
    __metadata("design:paramtypes", [index_1.EventService])
], FindEventsComponent);
exports.FindEventsComponent = FindEventsComponent;
//# sourceMappingURL=find-events.component.js.map