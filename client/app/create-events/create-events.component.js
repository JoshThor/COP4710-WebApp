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
var CreateEventsComponent = (function () {
    function CreateEventsComponent(_eventService, _alertService) {
        this._eventService = _eventService;
        this._alertService = _alertService;
        /* TODO:
          - Accessible by Admin, SuperAdmin*/
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
        this.timeKeeper = {
            hr: ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
            min: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "10",
                "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "10",
                "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "10",
                "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "10",
                "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
            mer: ["AM", "PM"]
        };
        /* Datepicker */
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'yyyy-mm-dd',
        };
        /* End Datepicker */
        this.AgmApiKey = "AIzaSyCXsG8bxccQbw17Xels5W3KzLmoP_Mfu2M";
        this.userObj = JSON.parse(localStorage.getItem("currentUser"));
        this.timeObject = { hr: "0", min: "0", mer: "0" };
        this.formData = {
            id: this.userObj._id,
            eventName: "",
            eventDescription: "",
            eventType: "",
            eventCategory: [],
            eventDate: "", eventTime: { hr: "0", min: "0" },
            eventDatetime: "",
            eventLocation: { lat: 28.538336, lng: -81.379234 },
        };
    }
    CreateEventsComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        //console.log( event.date );
        //console.log( event.jsdate );
        //console.log( event.formatted );
        this.formData.eventDate = event.formatted;
        console.log(this.formData.eventDate);
    };
    CreateEventsComponent.prototype.ngOnInit = function () {
        // Initialize values here
    };
    CreateEventsComponent.prototype.submitForm = function () {
        // Check that all fields are properly filled
        // Make request
        this.formatDateTime();
        console.log(this.formData);
        var event = {
            uid: this.formData.id + "",
            name: this.formData.eventName,
            time: this.formData.eventDatetime,
            category: this.formData.eventCategory[0],
            description: this.formData.eventDescription,
            latitude: "",
            longitude: ""
        };
        console.log(event);
        this._eventService.createEvent(event).subscribe(function (data) {
            console.log("success ", data);
        }),
            function (error) {
                console.log("ERR");
            };
        return;
    };
    CreateEventsComponent.prototype.convertMilitaryTime = function () {
        this.formData.eventTime.hr = parseInt(this.timeObject.hr, 10) + 12 * (this.timeObject.mer) + "";
        this.formData.eventTime.min = this.timeObject.min;
        if (this.formData.eventTime.hr.length < 2) {
            this.formData.eventTime.hr = "0" + this.formData.eventTime.hr;
        }
        if (this.formData.eventTime.min.length < 2) {
            this.formData.eventTime.min = "0" + this.formData.eventTime.min;
        }
    };
    CreateEventsComponent.prototype.formatDateTime = function () {
        var str = this.formData.eventDate.formatted;
        this.convertMilitaryTime();
        str += " " + this.formData.eventTime.hr + ":" + this.formData.eventTime.min + ":00";
        this.formData.eventDatetime = str;
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
    }),
    __metadata("design:paramtypes", [index_1.EventService, index_1.AlertService])
], CreateEventsComponent);
exports.CreateEventsComponent = CreateEventsComponent;
//# sourceMappingURL=create-events.component.js.map