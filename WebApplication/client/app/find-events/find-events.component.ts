import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/index';
import { AgmCoreModule, MapsAPILoader, SebmGoogleMap} from 'angular2-google-maps/core';
declare var module: { id: string; }

@Component({
  moduleId: module.id,
  selector: 'find-events',
  styles: [`
   .sebm-google-map-container {
     height: 300px;
     width: 300px;
   }
`],
  templateUrl: 'find-events.component.html',
})
export class FindEventsComponent {
  private publicEvents: any = [];
  private privateEvents: any = [];
  private rsoEvents: any = [];

  private togglePublicEventComments: boolean[] = [];
  private togglePrivateEventComments: boolean[] = [];
  private toggleRSOEventComments: boolean[] = [];

  constructor(private _eventService: EventService) { }

  private toggle(index: number, type: number): void {
    /* Public Events */
    if (type == 0) {
      this.togglePublicEventComments[index] = !this.togglePublicEventComments[index];
    }
    /* Private Events */
    if (type == 1) {
      this.togglePrivateEventComments[index] = !this.togglePrivateEventComments[index];
    }
    /* RSO Events */
    if (type == 2) {
      this.toggleRSOEventComments[index] = !this.toggleRSOEventComments[index];
    }
  }

  private ngOnInit(): void {
    let userObj = JSON.parse(localStorage.getItem("currentUser"));
    var i = 0;

    /* TODO:
      - Add a message stating there are no events if array.length == 0
    */

     this._eventService.getPublicEvents().subscribe(
      data => {
        console.log(data);
        this.publicEvents = data;
      }, error => {
        console.log("ERR");
      }
    );
    for (i=0; i<this.publicEvents.length; i++) {
      this.togglePublicEventComments.push(false);
    }

    this._eventService.getPrivateEvents( userObj._id ).subscribe(
      data => {
        console.log(data);
        this.privateEvents = data;
        for(let event of this.privateEvents)
        {

        }
      }, error => {
        console.log("ERR");
      });
    for (i=0; i<this.privateEvents.length; i++) {
      this.togglePrivateEventComments.push(false);
    }

    this._eventService.getRSOEvents( userObj._id ).subscribe(
      data => {
        console.log(data);
        this.rsoEvents = data;
      }, error => {
        console.log("ERR");
      });
    for (i=0; i<this.rsoEvents.length; i++) {
      this.toggleRSOEventComments.push(false);
    }
  }

  private parseString(value: string) {

    return parseFloat(value);

  }

  private stringToDate(string: string)
  {
    return new Date(string);
  }  
}


