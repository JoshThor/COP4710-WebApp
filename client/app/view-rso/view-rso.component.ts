import { Component, OnInit } from '@angular/core';
import { RSO } from '../_models/index';
import { RSOService } from '../_services/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'view-rso',
  templateUrl: 'view-rso.component.html'
})
export class ViewRSOComponent {
  /* TODO:
    - accessible by everyone
    - list all RSOs the user is not in
    - each list item is ONLY name of RSO
    - have a [join] button
  */

/*Fake data
  private rsoList: any[] = [
    "Test RSO Name 0", "Test RSO Name 1", "Test RSO Name 2", "Test RSO Name 4"
  ]
*/

  private rsos: RSO[] = [];
  private userObj;

  constructor(private _rsoService: RSOService) { }

//Join RSOs
  joinRSO(_id: string) {
    console.log(_id);
    this._rsoService.joinRSO(_id, this.userObj).subscribe((data) => { 
      this.loadRSOs() 
    },
    error => {
        console.log("Error: "+error._body);
        //this._alertService.error('Error');
      });
  }

  //On page load
  private ngOnInit() {
    this.userObj = JSON.parse( localStorage.getItem("currentUser") );
    this.loadRSOs();
  }

//Gets a list of joinable RSO's
  private loadRSOs() {
    this._rsoService.getJoinableRSOs( this.userObj._id ).subscribe(res => {

        this.rsos = res;
    });
  }

  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }
}
