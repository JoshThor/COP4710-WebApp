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

    public getAll(_id: string): any {
      // _id -> user ID
      // return http.get(...)...
      /* Test Data */
      return [
        { rid: "", rsoName: "" },
        { rid: "", rsoName: "" },
        { rid: "", rsoName: "" },
        { rid: "", rsoName: "" }
      ]
    }

    public joinRSO(_rid: string, uid: string): void {
      
    }
 }
