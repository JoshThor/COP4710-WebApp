import { Component, OnInit } from '@angular/core';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'create-rso',
  templateUrl: 'create-rso.component.html'
})
export class CreateRSOComponent {
  /* TODO:
    - accessible by everyone
    - http request:
      > userId (from local storage),
      > univeristyId (from list), [input field]
      > rsoName, [input field]
    - Make rsoService call (fake it)
    */

  private universityList: string[] = [
    "UCF", "UF", "FSU", "FGCU", "FAMU", "USF", "UM"
  ]

  private formData: any = {
    userId: "", // Local storage
    rsoName: "",
    uid: ""
  }

  private submitForm() {
    // Check that form is properly filled out
    // Make rsoService call
    console.log( this.formData );
  }

  private ngOnInit() {

  }

}
