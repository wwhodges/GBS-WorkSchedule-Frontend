import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { IWorkParams } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderList } from 'src/app/common/models/orderList.model';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();
  private orders: OrderList;
  private ordersForm: FormGroup;
  private currentPage = 0;
  private maxPages = 0;
  private isFilterVisible = false;

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

  workParams: IWorkParams = {
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
    PRIME: '',
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
    this.isLoading = true;
    this.apiData.getOrderFilteredType(this.workParams).pipe(takeUntil(this.unsubscribe$))
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
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();
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
  }

  filterUpdated() {
    this.loadData();
  }
}
