import { Component, OnInit, Input } from '@angular/core';
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
        <input type="text" class="form-control" [(ngModel)]="_comment" placeholder="Type your comments here..." />
      </div>
    </div>
  `
})
export class EventZippyComponent {
  /* TODO:
    - Make http request for comments in this component
    - Have single @Input for eventId to make http request */

  @Input('eventId') _id: String;
  private _comment: String = "";

  ngOnInit() {
    /* Make http request here */
  }
}
