import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService, ActiveUserService } from 'src/app/common/services';
import { ICustomerGroup } from 'src/app/common/models';
import { takeUntil, catchError } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';
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
      Object.assign(this.orderParams, this.filterStore.currentFilter);
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
    this.filterStore.currentFilter = this.orderParams; //JSON.stringify(this.orderParams);
    this.isLoading = true;
    this.apiData.getOrderFilteredType(this.orderParams).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        apiResult => {
          this.orders = apiResult;
          this.ordersForm = apiResult.CreateFormGroup();
          this.maxPages = this.orders.totalPages;
          this.isLoading = false;
          console.log(this.orders);
        }, (error) => { console.log(error); }
      );
  }

  public downloadExcel(): void {
    this.apiData.getOrderExcelFilteredType(this.orderParams).pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([x as Blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = data;
        const date = new Date();
        // tslint:disable-next-line: max-line-length
        const currDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        link.download = 'OrderList' + currDate + '.xlsx';
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(y => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
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
            this.apiData.updateOrder(order).pipe(catchError((err) => {
              this.toastr.error(err.error, 'Failure', {timeOut: 0});
              return of(undefined);
              }
              ))
          );
        }
      }
      forkJoin(saveObservableBatch).subscribe(
        (response) => {
          let success = saveObservableBatch.length;
          response.forEach( resp => { if (resp === undefined) { success--; } } );
          this.toastr.success('Saved ' + success + ' of ' + saveObservableBatch.length + ' orders', 'Success');
        }, (error) => { console.log(error); }
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
