import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { RSO } from '../_models/index';

@Injectable()
export class RSOService {
    constructor(private http: Http, private config: AppConfig) { }

    /* TODO:
      - What requests are to be made for RSOs?
      - What are the I/Os for each request?
      - Do I need to set up in ngModule?? */

    public getJoinableRSOs(_id: string): any {
      // return http.get(this.config.apiUrl + '/rsos/', this.jwt()).map((response: Response) => response.json());
      /* Test Data */
      return [
        { rid: "", rsoName: "" },
        { rid: "", rsoName: "" },
        { rid: "", rsoName: "" },
        { rid: "", rsoName: "" }
      ]
    }

    public joinRSO(_rid: string, uid: string) {
      // return http.post(this.config.apiUrl + '/rsos/join/' + _rid, this.jwt()).map((response: Response) => response.json());
    }

    public createRSO(data: any) {
      return this.http.post(this.config.apiUrl + '/rsos/create', data, this.jwt());
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
