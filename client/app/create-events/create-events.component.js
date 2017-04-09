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
var forms_1 = require("@angular/forms");
var core_2 = require("angular2-google-maps/core");
var index_1 = require("../_services/index");
var CreateEventsComponent = (function () {
    function CreateEventsComponent(_eventService, _rsoService, _alertService, mapsAPILoader, ngZone) {
        this._eventService = _eventService;
        this._rsoService = _rsoService;
        this._alertService = _alertService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        /* TODO:
          - Accessible by Admin, SuperAdmin
          - Reset form after
        */
        this.eventTypeList = [
            "Public",
            "Private",
            "RSO"
        ];
        this.RSOsList = [
            "fake RSO 1",
            "fake RSO 2",
            "fake RSO 3",
            "fake RSO 4"
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
        /********** Datepicker **********/
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'yyyy-mm-dd',
        };
        /********** End Datepicker **********/
        this.loading = false;
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
            rso: ""
        };
    }
    //private ngOnInit(): void { /* Initialize values here */ }
    CreateEventsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.formData.eventLocation.lat = 28.538336;
        this.formData.eventLocation.lng = -81.379234;
        //create search FormControl
        this.searchControl = new forms_1.FormControl();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.formData.eventLocation.lat = place.geometry.location.lat();
                    _this.formData.eventLocation.lng = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    CreateEventsComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.formData.eventLocation.lat = position.coords.latitude;
                _this.formData.eventLocation.lng = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    CreateEventsComponent.prototype.submitForm = function () {
        var _this = this;
        this.formatDateTime();
        console.log(this.formData);
        /* TODO: Check all fields are filled and valid before sending!! */
        var event = {
            uid: this.formData.id + "",
            name: this.formData.eventName,
            time: this.formData.eventDatetime,
            category: this.formData.eventCategory[0],
            description: this.formData.eventDescription,
            latitude: this.formData.eventLocation.lat,
            longitude: this.formData.eventLocation.lng,
            type: this.formData.eventType,
            rid: this.formData.rso
        };
        console.log(event);
        this.loading = true;
        this._eventService.createEvent(event).subscribe(function (data) {
            console.log("success ", data);
            _this.loading = false;
            _this.resetForm();
        }),
            function (error) {
                console.log("ERR");
                _this.loading = false;
            };
        /* TODO: Reset form after submitting */
    };
    CreateEventsComponent.prototype.resetForm = function () {
        this.formData = {
            id: this.userObj._id,
            eventName: "",
            eventDescription: "",
            eventType: "",
            eventCategory: [],
            eventDate: "", eventTime: { hr: "0", min: "0" },
            eventDatetime: "",
            eventLocation: { lat: 28.538336, lng: -81.379234 },
            rso: ""
        };
    };
    /* AUXILIARY FUNCTIONS */
    CreateEventsComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        this.formData.eventDate = event.formatted;
        //console.log( this.formData.eventDate );
    };
    CreateEventsComponent.prototype.changeEventType = function (e) {
        var _this = this;
        if (e.target.value === "RSO") {
            /* Call server for RSO for student */
            this._rsoService.getUserRSOs(this.userObj._id).subscribe(function (data) {
                console.log(data);
                _this.RSOsList = data;
            }, function (error) {
                console.log("ERR");
            });
        }
        else {
            this.formData.rso = "";
        }
    };
    CreateEventsComponent.prototype.convertMilitaryTime = function () {
        /* Convert to military time */
        this.formData.eventTime.hr = parseInt(this.timeObject.hr, 10) + 12 * (this.timeObject.mer) + "";
        this.formData.eventTime.min = this.timeObject.min;
        /* Format strings */
        if (this.formData.eventTime.hr.length < 2) {
            this.formData.eventTime.hr = "0" + this.formData.eventTime.hr;
        }
        if (this.formData.eventTime.min.length < 2) {
            this.formData.eventTime.min = "0" + this.formData.eventTime.min;
        }
    };
    CreateEventsComponent.prototype.formatDateTime = function () {
        /* Save and convert to military time */
        var str = this.formData.eventDate.formatted;
        this.convertMilitaryTime();
        /* Format strings */
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
    CreateEventsComponent.prototype.markerDragEnd = function (m, $event) {
        console.log('DragEnd', m, $event);
        this.formData.eventLocation.lat = m.lat;
        this.formData.eventLocation.lng = m.lng;
    };
    return CreateEventsComponent;
}());
__decorate([
    core_1.ViewChild("search"),
    __metadata("design:type", core_1.ElementRef)
], CreateEventsComponent.prototype, "searchElementRef", void 0);
CreateEventsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'create-events',
        templateUrl: 'create-events.component.html'
    }),
    __metadata("design:paramtypes", [index_1.EventService, index_1.RSOService, index_1.AlertService, core_2.MapsAPILoader, core_1.NgZone])
], CreateEventsComponent);
exports.CreateEventsComponent = CreateEventsComponent;
//# sourceMappingURL=create-events.component.js.map