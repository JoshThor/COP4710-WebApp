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

  private eventTypeList = [
    "List Option 0",
    "List Option 1",
    "List Option 2",
    "List Option 3"
  ]

  private categoryList = [
    "Category 0",
    "Category 1",
    "Category 2",
    "Category 3"
  ]

  private formData: any = {
    id: "", // Local storage
    eventName: "",
    eventDescription: "",
    eventType: "",
    eventCategory: [],
    eventLocation: "", /* TODO: Change to object {} when Google Maps is implemented */
    datetime: "" // Create function to calculate and format
  }

  private ngOnInit(): void {
    // Initialize values here
  }

  private submitForm(): void {
    // Check that all fields are properly filled
    // Make request
    console.log(this.formData);
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
