import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiDataService } from 'src/app/common/services';
import { IOrder } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IWorkParams } from 'src/app/common/models/workParams.model';
import { IOrderList } from 'src/app/common/models/orderList.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, OnChanges {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();
  private searchString: string;
  private queryParam = 'terms';
  private searchWork: IOrder[] = [];
  private searchOrders: IOrderList;
  private currentPage = 0;
  private maxPages = 0;

  workParams: IWorkParams = {
    INCLUDE_DESPATCHED: false,
    INCLUDE_PARTDESPATCHED: true,
    INCLUDE_PARTPACKED: true,
    INCLUDE_PARTPICKED: true,
    INCLUDE_SCHEDULED: true,
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
    MAX_WEIGHT: 0,
    SORT: 0,
    PAGESIZE: 200,
    PAGE: 0
  };

  private isLoading = true;

  constructor(private route: ActivatedRoute, private apiData: ApiDataService) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      // console.log(params);
      this.searchString = params.get(this.queryParam);
      this.isLoading = true;
      this.loadData();
    });
  }

  ngOnChanges() {
    this.isLoading = true;
    this.loadData();
  }

  loadData() {
    this.unsubscribe$.next();
    this.searchWork = [];
    console.log('searching', this.searchString);
    this.apiData.getOrderBySearch(this.searchString, this.workParams).pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.searchOrders = apiResult;
        this.searchWork = this.searchOrders.orders;
        this.maxPages = this.searchOrders.totalPages;
        this.isLoading = false;
        console.log('got response');
      }, (error) => {console.log(error); }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();

  }

  filterUpdated() {
    this.loadData();
  }
}
