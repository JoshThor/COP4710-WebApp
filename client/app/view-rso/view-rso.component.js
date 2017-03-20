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
var ViewRSOComponent = (function () {
    function ViewRSOComponent(_rsoService) {
        this._rsoService = _rsoService;
        /* TODO:
          - accessible by everyone
          - list all RSOs the user is not in
          - each list item is ONLY name of RSO
          - have a [join] button
          - make fake data call to get RSOs
        */
        this.rsoList = [
            "Test RSO Name 0", "Test RSO Name 1", "Test RSO Name 2", "Test RSO Name 4"
        ];
    }
    ViewRSOComponent.prototype.ngOnInit = function () {
        // let userObj = JSON.parse( localStorage.getItem("currentUser") );
        // this.rsoList = this._rsoService.getAllForUser( userObj._id );
    };
    return ViewRSOComponent;
}());
ViewRSOComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'view-rso',
        templateUrl: 'view-rso.component.html'
    }),
    __metadata("design:paramtypes", [index_1.RSOService])
], ViewRSOComponent);
exports.ViewRSOComponent = ViewRSOComponent;
//# sourceMappingURL=view-rso.component.js.map