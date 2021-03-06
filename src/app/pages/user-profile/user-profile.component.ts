import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IActiveUser } from 'src/app/common/models/activeUser.model';
import { ActiveUserService, ApiDataService } from 'src/app/common/services';
import { takeUntil } from 'rxjs/operators';
import { fieldSettings, defaultScheduledFields, defaultUnscheduledFields, IFieldSettings } from 'src/app/common/models/orderFields';
import { IUserSetting, IUserConfig } from 'src/app/common/models/userSetting.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public isLoading = true;
  public user: IActiveUser;
  public userImage: string;

  public allFields = fieldSettings;

  public userConfig: IUserConfig = { screenRows: 200, scheduledScreen: [], unscheduledScreen: []};
  // private scheduledFields: IFieldSettings[];
  // private unscheduledFields: IFieldSettings[];

  constructor(public userService: ActiveUserService,
              private apiData: ApiDataService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.userImage = this.userService.getUserImageLink();
    this.userService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe(
      userdata => {
        this.user = userdata;
        this.isLoading = false;
      });
    this.userService.getUserConfig().subscribe(
      config => { this.userConfig = config; }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  onDrop(event: CdkDragDrop<IFieldSettings[]>) {
    if ((!event.isPointerOverContainer || event.container.id === 'allFieldList') && event.previousContainer.id !== 'allFieldList') {
      event.previousContainer.data.splice(event.previousIndex, 1);
    } else {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        if (event.previousContainer.id === 'allFieldList' &&
          !event.container.data.some(item => item.desc === event.previousContainer.data[event.previousIndex].desc)) {
          copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
      }
    }
  }

  saveData() {
    this.userService.saveUserConfig(this.userConfig).subscribe(
      response => { this.toastr.success('User settings Saved', 'Saved'); }
    );
  }

}
