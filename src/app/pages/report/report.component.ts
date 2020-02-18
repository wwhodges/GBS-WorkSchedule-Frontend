import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiDataService, ActiveUserService } from 'src/app/common/services';
import { ICustomerGroup, CustomerGroup } from 'src/app/common/models';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
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
        this.reportString = 'report' + this.report.id.toString();
        if (this.filterStore.currentPage === this.reportString) {
          Object.assign(this.orderParams, JSON.parse(this.filterStore.currentFilter));
        }
        this.loadData();
      });
    });
  }

  loadData() {
    this.unsubscribe$.next();
    this.orderParams.page = this.currentPage;
    this.filterStore.currentPage = this.reportString;
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
