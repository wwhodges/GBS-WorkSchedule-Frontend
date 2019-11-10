import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IActiveUser } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
    apiRoot = 'https://ukwwhdappdi001/api/';

    constructor(private http: HttpClient) { }

    getUser() {
      const apiURL = `${this.apiRoot}user`;
      return this.http.get<IActiveUser>(apiURL, { withCredentials: true });
    }

    getUserImageLink() {
      return `${this.apiRoot}user/image`;
    }

}
