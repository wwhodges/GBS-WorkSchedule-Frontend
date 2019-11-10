import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IActiveUser } from 'src/app/common/models/activeUser.model';
import { ActiveUserService } from 'src/app/common/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  private isLoading = true;
  private user: IActiveUser;
  private userImage: string;

  constructor(private userService: ActiveUserService) { }

  ngOnInit() {
    this.userImage = this.userService.getUserImageLink();
    this.userService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe(
      userdata => {
        this.user = userdata;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
