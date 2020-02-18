import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService, ActiveUserService } from 'src/app/common/services';
import { ICustomerGroup } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { OrderList } from 'src/app/common/models/orderList.model';
import { FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOrderParams, OrderParams } from 'src/app/common/models/orderParams.model';
import { OrderFilterStorage } from 'src/app/common/services/orderFilterStorage.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  public orders: OrderList;
  public ordersForm: FormGroup;
  public currentPage = 0;
  public maxPages = 0;
  public isFilterVisible = false;
  public isLoading = true;
  public customerGroups: ICustomerGroup[];

  public listedFields = [
    // { name: 'batch', edit: false, type: 'text', desc: 'Batch', size: '5', style: '' },
    // { name: 'vistaStatus', edit: true, type: 'text', desc: 'Status', size: '15', style: '' },
    { name: 'dateInvoiced', edit: false, type: 'date', desc: 'Inv Date', size: '10', style: 'width: 130px;'},
    { name: 'account', edit: false, type: 'text', desc: 'Account', size: '10', style: '' },
    { name: 'name', edit: false, type: 'text', desc: 'Name', size: '34', style: '' },
    { name: 'status', edit: true, type: 'select', desc: 'Status', size: '15', style: ''},
    // { name: 'invWeight', edit: false, type: 'text', desc: 'Weight', size: '8', style: '' },
    { name: 'units', edit: false, type: 'text', desc: 'Units', size: '6', style: '' },
    { name: 'lines', edit: false, type: 'text', desc: 'Lines', size: '4', style: '' },
    { name: 'holdLoc', edit: true, type: 'text', desc: 'Holding', size: '10', style: ''},
    { name: 'palDest', edit: true, type: 'text', desc: 'Destination', size: '8', style: '' },
    { name: 'workDate', edit: true, type: 'date', desc: 'Work Date', size: '10', style: 'width: 130px;' },
    { name: 'delDate', edit: true, type: 'date', desc: 'Deliver Date', size: '10', style: 'width: 130px;' },
    { name: 'despDate', edit: true, type: 'date', desc: 'Despatch Date', size: '10', style: 'width: 130px;' },
  ];

  public orderParams: OrderParams;

  constructor(private apiData: ApiDataService,
              private userService: ActiveUserService,
              private toastr: ToastrService,
              private filterStore: OrderFilterStorage) { }

  ngOnInit() {
    this.orderParams = new OrderParams();
    if (this.filterStore.currentPage === 'schedule') {
      Object.assign(this.orderParams, JSON.parse(this.filterStore.currentFilter));
    } else {
      this.orderParams.includeScheduled = true;
      this.orderParams.includeUnscheduled = false;
      this.orderParams.filterStatus = '["","In Progress","In Progress 48Hr","Unstarted","Unstarted 48Hr","Prepared","Prepared 48Hr"]';
    }
    this.orders = new OrderList();
    this.listedFields = this.userService.config.scheduledScreen;
    this.loadData();
  }

  groupSelected(group: string) {
  }

  loadData() {
    this.unsubscribe$.next();
    this.orderParams.page = this.currentPage;
    this.filterStore.currentPage = 'schedule';
    this.filterStore.currentFilter = JSON.stringify(this.orderParams);
    this.isLoading = true;
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

  getExcel() {
    this.apiData.getOrderExcelFilteredType(this.orderParams).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        respData => { this.downLoadFile(respData, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); }
      );
  }

  downLoadFile(data: any, type: string) {
      const blob = new Blob([data], { type: type.toString() });
      const url = window.URL.createObjectURL(blob);
      const pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
          alert('Please disable your Pop-up blocker and try again.');
      }
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
      const saveObservableBatch = [];
      const ordArray = this.ordersForm.controls.orders as FormArray;
      for (let i = 0; i < ordArray.length; i++) {
        const ordForm = ordArray.controls[i] as FormGroup;
        const order = this.orders.orders[i];
        if (order.CheckForChanges(ordForm)) {
          // save order
          order.SaveFormValues(ordForm);
          saveObservableBatch.push(
            this.apiData.updateOrder(order)
          );
        }
      }
      forkJoin(saveObservableBatch).subscribe(
        (response) => {
          this.toastr.success('Saved ' + saveObservableBatch.length + ' orders', 'Success');
        }
      );
    }
    if ($event === 'cancel') {
      this.ordersForm = this.orders.CreateFormGroup();
    }
    if ($event === 'updated') {
      this.loadData();
    }
  }
}
