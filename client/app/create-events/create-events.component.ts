import { Component, OnInit } from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { EventService, AlertService } from '../_services/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'create-events',
  templateUrl: 'create-events.component.html'
})
export class CreateEventsComponent {
  /* TODO:
    - Accessible by Admin, SuperAdmin*/

  private eventTypeList = [
    "List Option 0",
    "List Option 1",
    "List Option 2",
    "List Option 3"
  ];

  private categoryList = [
    "Category 0",
    "Category 1",
    "Category 2",
    "Category 3"
  ];

  private timeKeeper = {
    hr: ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    min: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
          "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "10",
          "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "10",
          "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "10",
          "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "10",
          "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
    mer: ["AM", "PM"]
  }

  /* Datepicker */

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    //console.log( event.date );
    //console.log( event.jsdate );
    //console.log( event.formatted );

    this.formData.eventDate = event.formatted;
    console.log( this.formData.eventDate );
  }

  /* End Datepicker */

  private AgmApiKey = "AIzaSyCXsG8bxccQbw17Xels5W3KzLmoP_Mfu2M";


  private userObj = JSON.parse( localStorage.getItem("currentUser") );

  private timeObject: any = {hr: "0", min: "0", mer: "0"};

  private formData: any = {
    id: this.userObj._id,
    eventName: "",
    eventDescription: "",
    eventType: "",
    eventCategory: [],
    eventDate: "", eventTime: {hr: "0", min: "0"},
    eventDatetime: "",
    eventLocation: "", /* TODO: Change to object {} when Google Maps is implemented */
  }

  constructor(private _eventService: EventService, private _alertService: AlertService) { }

  private ngOnInit(): void {
    // Initialize values here
  }

  private submitForm(): void {
    // Check that all fields are properly filled
    // Make request
    this.formatDateTime();
    console.log(this.formData);

    let event = {
      uid: this.formData.id + "",
      name: this.formData.eventName,
      time: this.formData.eventDatetime,
      category: this.formData.eventCategory[0],
      description: this.formData.eventDescription,
      latitude: "",
      longitude: ""
    }

    console.log(event);

    this._eventService.createEvent(event).subscribe(
      data => {
        console.log("success ", data)}
      ),
      error => {
        console.log("ERR");
      };

    return;
  }

  private convertMilitaryTime() {
    this.formData.eventTime.hr = parseInt(this.timeObject.hr, 10) +  12*(this.timeObject.mer) + "";
    this.formData.eventTime.min = this.timeObject.min;

    if (this.formData.eventTime.hr.length < 2) {
      this.formData.eventTime.hr = "0" + this.formData.eventTime.hr;
    }

    if (this.formData.eventTime.min.length < 2) {
      this.formData.eventTime.min = "0" + this.formData.eventTime.min;
    }
  }

  private formatDateTime(): void {
    let str = this.formData.eventDate.formatted;
    this.convertMilitaryTime();

    str += " " + this.formData.eventTime.hr + ":" + this.formData.eventTime.min + ":00";
    this.formData.eventDatetime = str;
    return;
  }

  private updateCategory(val): void {
    // Iterate over array
    for (var i=0; i<this.formData.eventCategory.length; i++) {
      // Checks for membership
      if ( this.formData.eventCategory[i] === val ) {
        // Removes item if already a member
        this.formData.eventCategory.splice(i, i+1);
        return;
      }
    }
    // Add item if not already a member
    this.formData.eventCategory.push(val);
    return;
  }

}
