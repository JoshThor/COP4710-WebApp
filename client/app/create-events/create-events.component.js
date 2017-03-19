"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CreateEventsComponent = (function () {
    function CreateEventsComponent() {
        /* TODO:
          - Accessible by Admin, SuperAdmin
          - Send for http request:
            > id (from localStorage),
            > name of event, [input field],
            > type of event (from list), [input field]
            > time and date ("yyyy-mm-dd hh:mm:ss"),
            > category (from list), [input field]
            > description, [input field]
            > latitude (from Google Maps),
            > longitude (from Google Maps)
          - Make fake post request on submission */
        this.eventTypeList = [
            "List Option 0",
            "List Option 1",
            "List Option 2",
            "List Option 3"
        ];
        this.categoryList = [
            "Category 0",
            "Category 1",
            "Category 2",
            "Category 3"
        ];
        this.formData = {
            id: "",
            eventName: "",
            eventDescription: "",
            eventType: "",
            eventCategory: [],
            eventLocation: "",
            datetime: "" // Create function to calculate and format
        };
    }
    CreateEventsComponent.prototype.ngOnInit = function () {
        // Initialize values here
    };
    CreateEventsComponent.prototype.submitForm = function () {
        // Check that all fields are properly filled
        // Make request
        console.log(this.formData);
        return;
    };
    CreateEventsComponent.prototype.updateCategory = function (val) {
        // Iterate over array
        for (var i = 0; i < this.formData.eventCategory.length; i++) {
            // Checks for membership
            if (this.formData.eventCategory[i] === val) {
                // Removes item if already a member
                this.formData.eventCategory.splice(i, i + 1);
                return;
            }
        }
        // Add item if not already a member
        this.formData.eventCategory.push(val);
        return;
    };
    return CreateEventsComponent;
}());
CreateEventsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'create-events',
        templateUrl: 'create-events.component.html'
    })
], CreateEventsComponent);
exports.CreateEventsComponent = CreateEventsComponent;
//# sourceMappingURL=create-events.component.js.map