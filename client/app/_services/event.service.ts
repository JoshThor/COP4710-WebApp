import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Event } from '../_models/index';

@Injectable()
export class EventService {
    constructor(private http: Http, private config: AppConfig) { }

    /* TODO:
      - Add Event IDs to all get-events responses so that comments may be called on each
    */

    public createEvent(eventParam) {
      return this.http.post(this.config.apiUrl + '/events/create', eventParam, this.jwt()).map((response: Response) => response);
    }

    public getPublicEvents() {
      return this.http.get(this.config.apiUrl + '/events/public/', this.jwt()).map((response: Response) => response.json());
    }

    public getPrivateEvents(_id: string) {
      return this.http.get(this.config.apiUrl + '/events/private/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    public getRSOEvents(_id: string) {
      return this.http.get(this.config.apiUrl + '/events/rso/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    public getPendingEvents() {
      /* TODO: What call to make? */
      // -id -> Univeristy ID
      return this.http.get(this.config.apiUrl + '/events/pending', this.jwt()).map((response: Response) => response.json());
    }

    public approvePendingEvent(_id: string, approval) {
      // -id -> Event ID
      return this.http.post(this.config.apiUrl + '/events/approve/' + _id, approval, this.jwt()).map((response: Response) => response);
    }

    public getComments(_id: string) {
      // return this.http.get(this.config.apiUrl + '/comments/' + _id, this.jwt()).map((response: Response) => response.json());
      /* Test Data */
      /* TODO: Do these come back in reverse chronological order? */
      return [
        {  }
      ]
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
 }
