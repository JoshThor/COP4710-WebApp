import { Component, OnInit } from '@angular/core';
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
    - make fake data call to get RSOs
  */

  private rsoList: any[] = [
    "Test RSO Name 0", "Test RSO Name 1", "Test RSO Name 2", "Test RSO Name 4"
  ]

  constructor(private _rsoService: RSOService) { }

  private ngOnInit() {
    // Make rsoService call
  }
}
