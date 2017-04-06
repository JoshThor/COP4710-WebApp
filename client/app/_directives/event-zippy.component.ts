import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../_services/index';
import { User } from '../_models/index';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'event-zippy',
templateUrl: 'event-zippy.component.html'
})
export class EventZippyComponent {

  @Input('eventId') _eventId: string;

  private _myComment: string = "";

  private comments: any[] = [];

  private userObj;

  private commentParam = {
    uid: "",
    eid: "",
    body: "",
    rating: ""
  };


  constructor(private _eventService: EventService) {  
  }

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem('currentUser'));
    this._eventService.getComments( this._eventId ).subscribe(
      data => {
        this.comments = data;
        console.log(data);
      },
      error => {
        console.log("Error: " + error);
      }
    );
  }

  submit(){
    let comment = {
      uid: this.userObj._id,
      eid: this._eventId,
      body: this.commentParam.body,
      rating: '4'
    }

    console.log(comment);

    this._eventService.postComments(comment).subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
        console.log("Error: " + error);
      }
    );
  }
}
