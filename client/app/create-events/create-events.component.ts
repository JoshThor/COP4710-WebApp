import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { AgmCoreModule, MapsAPILoader, SebmGoogleMap } from 'angular2-google-maps/core';
import { EventService, RSOService, AlertService } from '../_services/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'create-events',
  templateUrl: 'create-events.component.html'
})

export class CreateEventsComponent {
  /* TODO:
    - Accessible by Admin, SuperAdmin
    - Reset form after
  */

  private eventTypeList: string[] = [
    "Public",
    "Private",
    "RSO"
  ];

  private RSOsList = [
    "fake RSO 1",
    "fake RSO 2",
    "fake RSO 3",
    "fake RSO 4"
  ]

  private categoryList = [
    "Category 0",
    "Category 1",
    "Category 2",
    "Category 3"
  ];

  private timeKeeper = {
    hr:  ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    min: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
          "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "10",
          "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "10",
          "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "10",
          "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "10",
          "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
    mer: ["AM", "PM"]
  }



  /********** Datepicker **********/

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  }



  /********** End Datepicker **********/

  private userObj: any = JSON.parse( localStorage.getItem("currentUser") );
  private timeObject: any = {hr: "0", min: "0", mer: "0"};
  private formData: any = {
    id: this.userObj._id,
    eventName: "",
    eventDescription: "",
    eventType: "",
    eventCategory: [],
    eventDate: "", eventTime: {hr: "0", min: "0"},
    eventDatetime: "",
    eventLocation: {lat: 28.538336, lng: -81.379234},
    rso: ""
  }

  /** Map Variables **/
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private _eventService: EventService, private _rsoService: RSOService, private _alertService: AlertService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

//private ngOnInit(): void { /* Initialize values here */ }

  ngOnInit() {
      //set google maps defaults
      this.zoom = 4;
      this.formData.eventLocation.lat = 28.538336;
      this.formData.eventLocation.lng = -81.379234;
      
      //create search FormControl
      this.searchControl = new FormControl();
      
      //set current position
      this.setCurrentPosition();
      
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            
            //set latitude, longitude and zoom
            this.formData.eventLocation.lat = place.geometry.location.lat();
            this.formData.eventLocation.lng = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.formData.eventLocation.lat = position.coords.latitude;
        this.formData.eventLocation.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private submitForm(): void {
    this.formatDateTime();
    console.log(this.formData);

    /* TODO: Check all fields are filled and valid before sending!! */
    let event = {
      uid: this.formData.id + "",
      name: this.formData.eventName,
      time: this.formData.eventDatetime,
      category: this.formData.eventCategory[0],
      description: this.formData.eventDescription,
      latitude: this.formData.eventLocation.lat,
      longitude: this.formData.eventLocation.lng,
      type: this.formData.eventType,
      rid: this.formData.rso
    }

    console.log(event);
    this._eventService.createEvent(event).subscribe(
      data => {
        console.log("success ", data)}
      ),
      error => {
        console.log("ERR");
      };

      /* TODO: Reset form after submitting */
  }

  /* AUXILIARY FUNCTIONS */

  private onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.formData.eventDate = event.formatted;
    //console.log( this.formData.eventDate );
  }

  private changeEventType(e) {
    if (e.target.value === "RSO") {
      /* Call server for RSO for student */
      this._rsoService.getUserRSOs(this.userObj._id).subscribe(
        data => {
          console.log(data);
          this.RSOsList = data;
        }, error => {
          console.log("ERR");
        });
    }
    else {
      this.formData.rso = "";
    }
  }

  private convertMilitaryTime() {
    /* Convert to military time */
    this.formData.eventTime.hr = parseInt(this.timeObject.hr, 10) +  12*(this.timeObject.mer) + "";
    this.formData.eventTime.min = this.timeObject.min;

    /* Format strings */
    if (this.formData.eventTime.hr.length < 2) {
      this.formData.eventTime.hr = "0" + this.formData.eventTime.hr;
    }

    if (this.formData.eventTime.min.length < 2) {
      this.formData.eventTime.min = "0" + this.formData.eventTime.min;
    }
  }

  private formatDateTime(): void {
    /* Save and convert to military time */
    let str = this.formData.eventDate.formatted;
    this.convertMilitaryTime();

    /* Format strings */
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

  private markerDragEnd(m, $event: MouseEvent) {
    console.log('DragEnd', m, $event);
    this.formData.eventLocation.lat = m.lat;
    this.formData.eventLocation.lng = m.lng;
  }

}

@NgModule({
  imports: [ 
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ App ],
  bootstrap: [ App ]
})
