import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { IOrder, IWorkParams } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IOrderList } from 'src/app/common/models/orderList.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();
  private searchWork: IOrder[] = [];
  private orders: IOrderList;
  private currentPage = 0;
  private maxPages = 0;

  workParams: IWorkParams = {
    INCLUDE_DESPATCHED: false,
    INCLUDE_PARTDESPATCHED: true,
    INCLUDE_PARTPACKED: true,
    INCLUDE_PARTPICKED: true,
    INCLUDE_SCHEDULED: true,
    INCLUDE_UNSCHEDULED: false,
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
    MAX_WEIGHT: 0,
    SORT: 0,
    PAGESIZE: 200,
    PAGE: 0
  };

  private isLoading = true;

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.unsubscribe$.next();
    this.searchWork = [];
    this.isLoading = true;
    this.apiData.getOrderFiltered(this.workParams).pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.orders = apiResult;
        this.searchWork = this.orders.orders;
        this.maxPages = this.orders.totalPages;
        this.isLoading = false;
      }, (error) => {console.log(error); }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();
  }

  buttonClick() {
    console.log(this.searchWork);
  }

  filterUpdated() {
    this.loadData();
  }

}
