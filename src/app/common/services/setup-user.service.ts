import { Injectable } from '@angular/core';
import { ActiveUserService } from './activeUser.service';

@Injectable({
  providedIn: 'root'
})
export class SetupUserService {

  constructor(private userService: ActiveUserService) { }

  public initialise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getLastLogin().subscribe();
      this.userService.getUser().subscribe((response) => {
        this.userService.getUserConfig().subscribe((config) => {
          resolve(true);
        });
      },
        (err) => { console.log('Error on startup' + err); });
    });
  }
}
