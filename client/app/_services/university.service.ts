import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { University } from '../_models/index';

@Injectable()
export class UniversityService {
    constructor(private http: Http, private config: AppConfig) { }

    /* TODO:
      - What requests are to be made for Universities?
      - What are the I/Os for each request?
      - Do I need to set up in ngModule?? */

    public getUniversities() {
      return this.http.get(this.config.apiUrl + '/university/', this.jwt()).map((response: Response) => response.json());
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
