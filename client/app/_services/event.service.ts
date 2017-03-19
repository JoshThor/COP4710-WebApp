import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Event } from '../_models/index';

@Injectable()
export class EventService {
    constructor(private http: Http, private config: AppConfig) { }

    public getPublicEvents() {
      //return this.http.get(this.config.apiUrl + '/events/public/', this.jwt()).map((response: Response) => response.json());
      /* Test Data */
      return [
        { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test Public Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""}
      ];
    }

    public getPrivateEvents(_id: string) {
      // _id -> Univeristy ID
      //return this.http.get(this.config.apiUrl + '/events/private/' + _id, this.jwt()).map((response: Response) => response.json());
      /* Test Data */
      return [
        { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test Private Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""}
      ];
    }

    public getRSOEvents(_id: string) {
      // _id -> RSO ID
      //return this.http.get(this.config.apiUrl + '/events/rso/' + _id, this.jwt()).map((response: Response) => response.json());
      /* Test Data */
      return [
        { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""},
        { eventName: "Test RSO Event Name", description: "test description", category: "", timedate: "", latitude: "", longitude: ""}
      ];
    }

    public getPendingEvents(_id: string) {
      // -id -> Univeristy ID
      // return ...
      /* Test Data */
      return [
        { eventName: "Test Pending Event" },
        { eventName: "Test Pending Event" },
        { eventName: "Test Pending Event" },
        { eventName: "Test Pending Event" },
        { eventName: "Test Pending Event" },
        { eventName: "Test Pending Event" }
      ];
    }

    public approvePendingEvent(_id: string, approval: string): void {
      // -id -> Event ID
      // return ... (POST)
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
