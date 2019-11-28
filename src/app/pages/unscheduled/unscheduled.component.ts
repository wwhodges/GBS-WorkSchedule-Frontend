import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { IWorkParams, ICustomerGroup } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderList } from 'src/app/common/models/orderList.model';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-unscheduled',
  templateUrl: './unscheduled.component.html',
  styleUrls: ['./unscheduled.component.scss']
})
export class UnscheduledComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private orders: OrderList;
  private ordersForm: FormGroup;
  private currentPage = 0;
  private maxPages = 0;
  private isFilterVisible = false;
  private isLoading = true;
  private customerGroups: ICustomerGroup[];

  private listedFields = [
    { name: 'batch', edit: false, type: 'text', desc: 'Batch', size: '5', style: '' },
    { name: 'vistaStatus', edit: true, type: 'text', desc: 'Status', size: '15', style: '' },
    { name: 'account', edit: false, type: 'text', desc: 'Account', size: '10', style: '' },
    { name: 'name', edit: false, type: 'text', desc: 'Name', size: '34', style: '' },
    { name: 'invWeight', edit: false, type: 'text', desc: 'Weight', size: '8', style: '' },
    { name: 'units', edit: false, type: 'text', desc: 'Units', size: '6', style: '' },
    { name: 'lines', edit: false, type: 'text', desc: 'Lines', size: '4', style: '' },
    { name: 'palDest', edit: true, type: 'text', desc: 'Destination', size: '8', style: '' },
    { name: 'workDate', edit: true, type: 'date', desc: 'Work', size: '10', style: 'width: 130px;' },
    { name: 'delDate', edit: true, type: 'date', desc: 'Deliver', size: '10', style: 'width: 130px;' },
    { name: 'despDate', edit: true, type: 'date', desc: 'Despatch', size: '10', style: 'width: 130px;' },
  ];

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
    MAX_WEIGHT: 0,
    SORT: 0,
    PAGESIZE: 50,
    PAGE: 0,
    PRIME: ''
  };

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadData();
  }

  groupSelected(group: string) {
    if (group === '*') {
      this.orderParams.GROUPID = 0;
      this.orderParams.PRIME = '';
      this.orderParams.MIN_WEIGHT = 0;
    } else {
      const groupObj = this.customerGroups.find(grp => grp.id === +group);
      if (groupObj.prime !== '') {
        this.orderParams.PRIME = groupObj.prime;
        this.orderParams.GROUPID = 0;
      } else {
        this.orderParams.PRIME = '';
        this.orderParams.GROUPID = +group;
      }
      this.orderParams.MIN_WEIGHT = groupObj.minWeight;
      this.orderParams.SORT = groupObj.groupByAcct ? 1 : 0;
    }
    this.currentPage = 0;
    this.loadData();
  }

  loadData() {
    this.unsubscribe$.next();
    this.apiData.getCustomerGroups().pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.customerGroups = apiResult;
      }
    );
    this.orderParams.PAGE = this.currentPage;
    this.apiData.getOrderFilteredType(this.orderParams).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        apiResult => {
          this.orders = apiResult;
          this.ordersForm = apiResult.CreateFormGroup();
          this.maxPages = this.orders.totalPages;
          this.isLoading = false;
        }, (error) => { console.log(error); }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  pageChange($event) {
    this.currentPage = $event;
    this.loadData();
  }

  formAction($event) {
    if ($event === 'save') {
      const ordArray = this.ordersForm.controls.orders as FormArray;
      for (let i = 0; i < ordArray.length; i++) {
        const ordForm = ordArray.controls[i] as FormGroup;
        const order = this.orders.orders[i];
        if (order.CheckForChanges(ordForm)) {
          // save order
        }
      }
    }
    if ($event === 'cancel') {
      this.ordersForm = this.orders.CreateFormGroup();
    }
    if ($event === 'updated' ) {
      this.loadData();
    }
  }
}
