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
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var CreateRSOComponent = (function () {
    function CreateRSOComponent(_rsoService, _alertService) {
        this._rsoService = _rsoService;
        this._alertService = _alertService;
        this.universityList = [
            "UF", "UCF", "FSU", "FGCU", "FAMU", "USF", "UM"
        ]; /* TODO: These strings evaluate to numbers */
        this.userObj = JSON.parse(localStorage.getItem("currentUser"));
        this.formData = {
            uid: this.userObj._id,
            rsoName: "",
            unid: 1 // Number
        };
    }
    CreateRSOComponent.prototype.submitForm = function () {
        // Check that form is properly filled out
        // Make rsoService call
        console.log(this.formData);
        this._rsoService.createRSO(this.formData).subscribe(function (data) {
            //this._alertService.success('Success');
            console.log("Success!");
        }, function (error) {
            console.log("ERROR");
            //this._alertService.error('Error');
        }); // */
    };
    CreateRSOComponent.prototype.ngOnInit = function () {
    };
    return CreateRSOComponent;
}());
CreateRSOComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'create-rso',
        templateUrl: 'create-rso.component.html'
    }),
    __metadata("design:paramtypes", [index_1.RSOService, index_1.AlertService])
], CreateRSOComponent);
exports.CreateRSOComponent = CreateRSOComponent;
//# sourceMappingURL=create-rso.component.js.map