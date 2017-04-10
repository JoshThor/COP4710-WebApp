import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../_services/index';
import { User } from '../_models/index';
import {Rating} from './rating.component';
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

  private rate:number = 0;

  private commentParam = {
    uid: "",
    eid: "",
    body: "",
    rating: "1"
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

  onRatingUpdate(value) {
    this.rate = value;
    this.commentParam.rating = value;
    //console.log(this.commentParam);
  }

  submit(){
    let comment = {
      uid: this.userObj._id,
      eid: this._eventId,
      body: this.commentParam.body,
      rating: this.commentParam.rating
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
