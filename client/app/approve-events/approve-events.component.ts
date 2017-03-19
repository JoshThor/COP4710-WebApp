import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'approve-events',
  templateUrl: 'approve-events.component.html'
})
export class ApproveEventsComponent {
  /* TODO:
    - list of ONLY public and private events
    - only need name and [approve] and [deny] buttons
    - Make eventService call with test data for pending events
    - Make eventService call on test data for approval/disapproval */

  private publicEvents = [];
  private privateEvents = [];

  constructor(private _eventService: EventService) { }

  private approval(value): void {
    /* TODO: Make call on eventService to approve/disapprove event */
  }

  private ngOnInit() {
    this.publicEvents = this._eventService.getPublicEvents(); //.subscribe((rsp) => { console.log(rsp); });
    this.privateEvents = this._eventService.getPrivateEvents(""); //.subscribe((rsp) => { console.log(rsp); });
  }

}
