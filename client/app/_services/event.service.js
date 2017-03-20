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
var http_1 = require("@angular/http");
var app_config_1 = require("../app.config");
var EventService = (function () {
    function EventService(http, config) {
        this.http = http;
        this.config = config;
    }
    /* TODO:
      - Add Event IDs to all get-events responses so that comments may be called on each
    */
    EventService.prototype.getPublicEvents = function () {
        //return this.http.get(this.config.apiUrl + '/events/public/', this.jwt()).map((response: Response) => response.json());
        /* Test Data */
        return [
            { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" }
        ];
    };
    EventService.prototype.getPrivateEvents = function (_id) {
        // _id -> Univeristy ID
        //return this.http.get(this.config.apiUrl + '/events/private/' + _id, this.jwt()).map((response: Response) => response.json());
        /* Test Data */
        return [
            { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" }
        ];
    };
    EventService.prototype.getRSOEvents = function (_id) {
        // _id -> user ID
        //return this.http.get(this.config.apiUrl + '/events/rso/' + _id, this.jwt()).map((response: Response) => response.json());
        /* Test Data */
        return [
            { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" },
            { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: "" }
        ];
    };
    EventService.prototype.getPendingEvents = function (_id) {
        /* TODO: What call to make? */
        // -id -> Univeristy ID
        //return this.http.get(this.config.apiUrl + '' + _id, this.jwt()).map((response: Response) => response.json());
        /* Test Data */
        return [
            { eventName: "Test Pending Event" },
            { eventName: "Test Pending Event" },
            { eventName: "Test Pending Event" },
            { eventName: "Test Pending Event" },
            { eventName: "Test Pending Event" },
            { eventName: "Test Pending Event" }
        ];
    };
    EventService.prototype.approvePendingEvent = function (_id, approval) {
        // -id -> Event ID
        // return this.http.get(this.config.apiUrl + '/events/approve/' + _id, this.jwt()).map((response: Response) => response.json());
    };
    EventService.prototype.getComments = function (_id) {
        // return this.http.get(this.config.apiUrl + '/comments/' + _id, this.jwt()).map((response: Response) => response.json());
        /* Test Data */
        /* TODO: Do these come back in reverse chronological order? */
        return [
            {}
        ];
    };
    EventService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return EventService;
}());
EventService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map