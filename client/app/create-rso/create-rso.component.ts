import { Component, OnInit } from '@angular/core';
import { RSOService, AlertService } from '../_services/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'create-rso',
  templateUrl: 'create-rso.component.html'
})
export class CreateRSOComponent {

  constructor(private _rsoService: RSOService, private _alertService: AlertService) { }

  private universityList: string[] = [
    "UF", "UCF", "FSU", "FGCU", "FAMU", "USF", "UM"
  ]; /* TODO: These strings evaluate to numbers */

  private userObj = JSON.parse( localStorage.getItem("currentUser") );

  private formData: any = {
    uid: this.userObj._id,
    rsoName: "",
    unid: 1 // Number
  }

  private submitForm() {
    // Check that form is properly filled out
    // Make rsoService call
    console.log( this.formData );
    this._rsoService.createRSO( this.formData ).subscribe(
      data => {
        //this._alertService.success('Success');
        console.log("Success!");
      },
      error => {
        console.log("ERROR");
        //this._alertService.error('Error');
      }
    ); // */
  }

  private ngOnInit() {

  }

}
