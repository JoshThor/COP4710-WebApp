"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CreateRSOComponent = (function () {
    function CreateRSOComponent() {
        /* TODO:
          - accessible by everyone
          - http request:
            > userId (from local storage),
            > univeristyId (from list), [input field]
            > rsoName, [input field]
          - Make rsoService call (fake it)
          */
        this.universityList = [
            "UCF", "UF", "FSU", "FGCU", "FAMU", "USF", "UM"
        ];
        this.formData = {
            userId: "",
            rsoName: "",
            uid: ""
        };
    }
    CreateRSOComponent.prototype.submitForm = function () {
        // Check that form is properly filled out
        // Make rsoService call
        console.log(this.formData);
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
    })
], CreateRSOComponent);
exports.CreateRSOComponent = CreateRSOComponent;
//# sourceMappingURL=create-rso.component.js.map