import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/index';
import { Event } from '../_models/index';

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

  private Events = [];

  private eventData: any = {
      status: ""
    };


  constructor(private _eventService: EventService) { }

  private approval(eid, value: string): void {

    this.eventData.status = value

    console.log("DEBUG: " +eid + " "+ value);
    
    this._eventService.approvePendingEvent(eid, this.eventData).subscribe((data) => { 
      this.loadEvents();
    },
    error => {
        console.log("Error: "+error._body);
        //this._alertService.error('Error');
      });
  }

  private ngOnInit() {
    this.loadEvents();
  }

  private loadEvents()
  {
    this._eventService.getPendingEvents().subscribe((rsp) => 
    { 
      console.log(rsp); 
      this.Events = rsp;
    },
    err => {
      console.log(err);
    });
  }

}
