import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IActiveUser } from 'src/app/common/models/activeUser.model';
import { ActiveUserService, ApiDataService } from 'src/app/common/services';
import { takeUntil } from 'rxjs/operators';
import { fieldSettings, defaultScheduledFields, defaultUnscheduledFields, IFieldSettings } from 'src/app/common/models/orderFields';
import { IUserSetting } from 'src/app/common/models/userSetting.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

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

  private allFields = fieldSettings;

  private scheduledFields: IFieldSettings[];
  private unscheduledFields: IFieldSettings[];

  constructor(private userService: ActiveUserService, private apiData: ApiDataService) { }

  ngOnInit() {
    this.userImage = this.userService.getUserImageLink();
    this.userService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe(
      userdata => {
        this.user = userdata;
        this.isLoading = false;
      });
    this.apiData.getUserSetting('scheduled').subscribe(
      setting => {
        if (setting === null) {
          this.scheduledFields = defaultScheduledFields;
          // this.apiData.insertUserSetting('schedule', JSON.stringify(this.scheduleFields)).subscribe(
          // response => { console.log(response); }
          // );
        } else {
          this.scheduledFields = JSON.parse(setting.settingData);
        }
        console.log(this.scheduledFields);
      },
      error => {
        console.log(error);
      }
    );
    this.apiData.getUserSetting('unscheduled').subscribe(
      setting => {
        if (setting === null) {
          this.unscheduledFields = defaultUnscheduledFields;
          // this.apiData.insertUserSetting('unscheduled',
          // JSON.stringify(this.unscheduledFields)).subscribe(
          // response => { console.log(response); }
          // );
        } else {
          this.unscheduledFields = JSON.parse(setting.settingData);
        }
        console.log(this.unscheduledFields);
      },
      error => {
        console.log(error);
      }
    );

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  onDrop(event: CdkDragDrop<IFieldSettings[]>) {
    console.log(event);
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
    this.apiData.insertUserSetting('scheduled', JSON.stringify(this.scheduledFields)).subscribe(
      response => { console.log(response); }
    );
    this.apiData.insertUserSetting('unscheduled', JSON.stringify(this.unscheduledFields)).subscribe(
      response => { console.log(response); }
    );

  }

}
