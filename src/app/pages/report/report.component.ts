import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService, ActiveUserService } from 'src/app/common/services';
import { ICustomerGroup, CustomerGroup } from 'src/app/common/models';
import { takeUntil, catchError } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';
import { OrderList } from 'src/app/common/models/orderList.model';
import { FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOrderParams, OrderParams } from 'src/app/common/models/orderParams.model';
import { OrderFilterStorage } from 'src/app/common/services/orderFilterStorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  public orders: OrderList;
  public ordersForm: FormGroup;
  public orderParams: OrderParams;
  public listedFields: string[];

  public currentPage = 0;
  public maxPages = 0;
  public isLoading = true;

  private queryParam = 'reportId';
  private reportId: number;
  public report: CustomerGroup;
  private reportString: string;

  constructor(private apiData: ApiDataService,
    private userService: ActiveUserService,
    private toastr: ToastrService,
    private filterStore: OrderFilterStorage,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.orders = new OrderList();
    this.report = new CustomerGroup();

    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.orderParams = new OrderParams();
      this.reportId = +params.get(this.queryParam);

      this.apiData.getCustomerGroup(this.reportId).pipe(takeUntil(this.unsubscribeParams$)).subscribe((reportData) => {
        this.report = reportData;
        this.orderParams = this.report.filterParams;
        this.listedFields = this.report.fieldList;

        this.orderParams.groupId = this.reportId;
        this.orderParams.matchAllBranches = this.report.matchAllBranches;
        this.orderParams.includeExcludeAccounts = this.report.includeExcludeAccounts;
  
        this.reportString = 'report/' + this.report.id.toString();
        if (this.filterStore.currentPage === this.reportString) {
          Object.assign(this.orderParams, this.filterStore.currentFilter);
        }
        this.loadData();
      });
    });
  }

  loadData() {
    this.unsubscribe$.next();
    this.orderParams.page = this.currentPage;
    this.filterStore.currentPage = this.reportString;
    this.filterStore.currentFilter = this.orderParams; //JSON.stringify(this.orderParams);
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
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();
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
              this.toastr.error(err.error, 'Failure', { timeOut: 0 });
              return of(undefined);
            }
            ))
          );
        }
      }
      forkJoin(saveObservableBatch).subscribe(
        (response) => {
          let success = saveObservableBatch.length;
          response.forEach(resp => { if (resp === undefined) { success--; } });
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
