import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService, ActiveUserService } from 'src/app/common/services';
import { ICustomerGroup } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { OrderList } from 'src/app/common/models/orderList.model';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderParams } from 'src/app/common/models/orderParams.model';
import { OrderFilterStorage } from 'src/app/common/services/orderFilterStorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();
  public orders: OrderList;
  public ordersForm: FormGroup;
  public currentPage = 0;
  public maxPages = 0;
  public isFilterVisible = false;
  public isLoading = true;
  public customerGroups: ICustomerGroup[];
  private searchString: string;
  private queryParam = 'terms';

  public listedFields = [
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

  public orderParams: OrderParams;

  constructor(private route: ActivatedRoute,
    private apiData: ApiDataService,
    private userService: ActiveUserService,
    private toastr: ToastrService,
    private filterStore: OrderFilterStorage) { }

  ngOnInit() {
    this.orders = new OrderList();
    this.listedFields = this.userService.config.unscheduledScreen;

    this.orderParams = new OrderParams();
    if (this.filterStore.currentPage === 'search') {

      Object.assign(this.orderParams, JSON.parse(this.filterStore.currentFilter));
      this.loadData();
    }
    else {
      this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
        this.orderParams = new OrderParams();
        this.searchString = params.get(this.queryParam);
        if (this.searchString) {
          if (this.searchString.length === 5 && parseInt(this.searchString, 10) > 0) { this.orderParams.filterBatch = this.searchString; } else
            if (this.searchString.length === 10 && parseInt(this.searchString, 10) > 0) { this.orderParams.filterAccount = this.searchString; } else
              if (this.searchString.length === 8 && parseInt(this.searchString.substring(2, 4), 10) > 0) { this.orderParams.filterInvoice = this.searchString; } else {
                this.orderParams.filterName = '%' + this.searchString + '%';
              }
          this.loadData();
        }
      });
    }

  }

  groupSelected(group: string) {
  }

  loadData() {
    this.unsubscribe$.next();
    this.orderParams.page = this.currentPage;
    this.isLoading = true;
    this.filterStore.currentPage = 'search'
    this.filterStore.currentFilter = JSON.stringify(this.orderParams);
    this.apiData.getOrderFilteredType(this.orderParams).pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.orders = apiResult;
        this.ordersForm = apiResult.CreateFormGroup();
        this.maxPages = this.orders.totalPages;
        this.isLoading = false;
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
