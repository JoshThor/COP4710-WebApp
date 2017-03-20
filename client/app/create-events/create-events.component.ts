import { Component, OnInit } from '@angular/core';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'create-events',
  templateUrl: 'create-events.component.html'
})
export class CreateEventsComponent {
  /* TODO:
    - Accessible by Admin, SuperAdmin

    - Add datepicker from https://www.npmjs.com/package/angular2-datepicker
     OR https://github.com/ng2-ui/ng2-datetime-picker */

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

  private userObj = JSON.parse( localStorage.getItem("currentUser") );


  private formData: any = {
    id: this.userObj._id,
    eventName: "",
    eventDescription: "",
    eventType: "",
    eventCategory: [],
    eventLocation: "", /* TODO: Change to object {} when Google Maps is implemented */
    datetime: ""
  }

  private ngOnInit(): void {
    // Initialize values here
  }

  private submitForm(): void {
    this.formatDateTime();
    // Check that all fields are properly filled
    // Make request
    console.log(this.formData);
    return;
  }

  private formatDateTime(): void {
    // Add all values as strings, format as "YYYY-MM-DDTHH:MM:SSZ", create new datetime and set to formData attribute
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
