import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../_services/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'event-zippy',
  template: `
    <div>

      <div class="form-group"> <!-- *ngFor="let comment in comments; i = index" for <div> element -->
        <label>
          Commenter's username
          <br/>
          <span class="badge">4 <span class="glyphicon glyphicon-star" aria-hidden="true"></span></span>
        </label>
        <input type="text" class="form-control" disabled placeholder="User's comments..." />
      </div>

      <div class="form-group">
        <label>Current user's username</label>
        <input type="text" class="form-control" [(ngModel)]="_myComment" placeholder="Type your comments here..." />
      </div>
    </div>
  `
})
export class EventZippyComponent {
  @Input('eventId') _eventId: string;
  private _myComment: string = "";

  private comments: any[] = [];

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    // this.comments = this._eventService.getComments( this._eventId );
  }
}
