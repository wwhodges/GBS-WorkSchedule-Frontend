import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Order } from 'src/app/common/models';
import { ApiDataService } from 'src/app/common/services';
import { Subject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fieldSettings, workTypeField } from 'src/app/common/models/orderFields';
import { Customer } from 'src/app/common/models/customer.model';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  private queryParam = 'id';
  private orderId: string;

  public vistaStatusOptions = fieldSettings.find(f => f.name === 'vistaStatus').options;
  public statusOptions = fieldSettings.find(f => f.name === 'status').options;
  public workTypeOptions = workTypeField.options;

  public isLoading = true;
  public saveDisabled = false;

  public order: Order;
  public orderForm: FormGroup;
  public cust: Customer;
  public custForm: FormGroup;

  constructor(private apiData: ApiDataService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cust = new Customer();
    this.custForm = this.cust.CreateFormGroup();

    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      this.saveDisabled = false;
      this.orderId = params.get(this.queryParam);
      if (this.orderId === 'new') {
        // delay the new form for a moment because otherwise the form controls aren't
        // disabled. Some kind of bug in Angular.
        of(new Order()).pipe(delay(10)).subscribe(
          delayedResult => {
            this.order = delayedResult;
            this.orderForm = this.order.CreateFormGroup();
            this.isLoading = false;
            this.orderForm.get('account').valueChanges.subscribe(
              acctUpdate => this.getCustomer()
            );
          }
        );
      } else {
        this.apiData.getOrderById(this.orderId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.order = apiResult;
            this.orderForm = this.order.CreateFormGroup();
            this.isLoading = false;
            this.getCustomer();
          }
        );
      }
    });
  }

  getCustomer() {
    this.apiData.getCustomer(this.order.account).pipe(takeUntil(this.unsubscribe$)).subscribe(
      custResult => {
        this.cust = custResult;
        this.custForm = this.cust.CreateFormGroup();
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  deleteOrder() {
    this.apiData.deleteOrder(this.order).subscribe(
      (response) => {
        this.toastr.success('Order deleted', 'Success');
      }, error => {
        this.toastr.warning('Failed to delete: ' + error);
      }
    );
  }

  resetForm() {
    this.orderForm = this.order.CreateFormGroup();
  }

  submitForm() {
    this.saveDisabled = true;
    this.order.SaveFormValues(this.orderForm);
    if (this.order.id === 0) {
      this.apiData.insertOrder(this.order).subscribe(
        (response) => {
          this.toastr.success('Order has been created', 'Success');
          // redirect to created order
          this.router.navigate(['/order', response.id]);
        }, error => {
          this.toastr.warning('Insert failed: ' + error.error);
          this.saveDisabled = false;
        }
      );
    } else {
      this.apiData.updateOrder(this.order).subscribe(
        (response) => {
          this.toastr.success('Order has been updated', 'Success');
          this.saveDisabled = false;
        }, error => {
          this.toastr.warning('Update failed: ' + error.error);
          this.saveDisabled = false;
        }
      );
    }
  }

}

