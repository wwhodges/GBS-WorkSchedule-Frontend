import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IActiveUser } from '../models/index';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUserSetting, IUserConfig } from '../models/userSetting.model';
import { fieldSettings, defaultScheduledFields, defaultUnscheduledFields, IFieldSettings } from 'src/app/common/models/orderFields';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
  apiRoot = environment.apiEndpoint;

  public user: IActiveUser;
  public config: IUserConfig;
  public lastLogin: Date;

  constructor(private http: HttpClient) { }

  getUser(): Observable<IActiveUser> {
    if (this.user === undefined) {
      const apiURL = `${this.apiRoot}user`;
      return this.http.get<IActiveUser>(apiURL, { withCredentials: true }).pipe(
        tap(userData => { this.user = userData; })
      );
    } else {
      return new Observable(u => { u.next(this.user); u.complete(); });
    }
  }

  getUserImageLink() {
    return `${this.apiRoot}user/image`;
  }

  getLastLogin() {
    const apiURL = `${this.apiRoot}GBSWorkSchedule/UserSetting/LastLogin`;
    return this.http.get<IUserSetting>(apiURL, { withCredentials: true }).pipe(
      tap(setting => {
        this.lastLogin = setting === null ? new Date() : new Date(setting.settingData);
        const newSetting: IUserSetting = {
          username: '',
          settingKey: 'LastLogin',
          settingData: new Date().toISOString()
        };
        const apiPostURL = `${this.apiRoot}GBSWorkSchedule/UserSetting/`;
        this.http.post<IUserSetting>(apiPostURL, newSetting, { withCredentials: true }).subscribe();
      }));
  }

  getUserConfig(): Observable<IUserConfig> {
    if (this.config === undefined) {
      const apiURL = `${this.apiRoot}GBSWorkSchedule/UserSetting/Config`;
      return this.http.get<IUserSetting>(apiURL, { withCredentials: true })
        .pipe(map(settingData => settingData === null ?
          {
            screenRows: 200,
            scheduledScreen: defaultScheduledFields,
            unscheduledScreen: defaultUnscheduledFields
          } : JSON.parse(settingData.settingData)),
          tap(config => { this.config = config; })
        );
    } else {
      return new Observable(c => { c.next(this.config); c.complete(); });
    }
  }

  saveUserConfig(config: IUserConfig) {
    this.config = config;
    const newSetting: IUserSetting = {
      username: '',
      settingKey: 'Config',
      settingData: JSON.stringify(config)
    };
    const apiURL = `${this.apiRoot}GBSWorkSchedule/UserSetting`;
    return this.http.post<IUserSetting>(apiURL, newSetting, { withCredentials: true });
  }
}
