import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { IOrder, ICustomerGroup, IWorkParams } from 'src/app/common/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-unscheduled',
  templateUrl: './unscheduled.component.html',
  styleUrls: ['./unscheduled.component.scss']
})
export class UnscheduledComponent implements OnInit, OnChanges, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  private isLoading = true;
  private workList: IOrder[];
  private customerGroups: ICustomerGroup[];

  private orderParams: IWorkParams = {
    INCLUDE_DESPATCHED: false,
    INCLUDE_PARTDESPATCHED: true,
    INCLUDE_PARTPACKED: true,
    INCLUDE_PARTPICKED: true,
    INCLUDE_SCHEDULED: false,
    INCLUDE_UNSCHEDULED: true,
    INCLUDE_UNSTARTED: true,
    DATE_FROM: new Date(),
    DATE_RANGE: '',
    DATE_TO: new Date(),
    INVOICE: '',
    SITE: '',
    BATCH: '',
    ACCOUNT: '',
    NAME: '',
    GROUPID: 0,
    WORKID: 0,
    MIN_WEIGHT: 0,
    MAX_WEIGHT: 0
  };

  private popupVisible = false;

  constructor(private apiData: ApiDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadData();
  }

  ngOnChanges() {
    this.loadData();
  }

  groupSelected(group: string) {
    console.log('parent grp sel ' + group)
    if (group === '*') {
      this.orderParams.GROUPID = 0; } else {
      this.orderParams.GROUPID = +group;
    }
    this.loadData();
  }

  loadData() {
    this.unsubscribe$.next();
    this.workList = [];
    this.apiData.getCustomerGroups().pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.customerGroups = apiResult;
      }
    );
    this.apiData.getOrderFiltered(this.orderParams).pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.workList = apiResult;
        this.isLoading = false;
      }, (error) => {console.log(error); }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  filterUpdated() {
    this.isLoading = true;
    this.loadData();
  }

}
