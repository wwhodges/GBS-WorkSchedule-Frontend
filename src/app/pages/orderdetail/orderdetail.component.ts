import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Order } from 'src/app/common/models';
import { ApiDataService } from 'src/app/common/services';
import { Subject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fieldSettings } from 'src/app/common/models/orderFields';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  private orderId: string;
  public order: Order;
  public vistaStatusOptions = fieldSettings.find(f => f.name === 'vistaStatus').options;
  public statusOptions = fieldSettings.find(f => f.name === 'status').options;
  private queryParam = 'id';
  public isLoading = true;

  public orderForm: FormGroup;

  constructor(private apiData: ApiDataService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      this.orderId = params.get(this.queryParam);
      console.log(this.orderId);
      if (this.orderId === 'new') {
        // delay the new form for a moment because otherwise the form controls aren't
        // disabled. Some kind of bug in Angular.
        of(new Order()).pipe(delay(10)).subscribe(
          delayedResult => {
            this.order = delayedResult;
            this.orderForm = this.order.CreateFormGroup();
            this.isLoading = false;
            console.log(this.order);
            console.log(this.orderForm);
          }
        );
      } else {
        this.apiData.getOrderById(this.orderId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.order = apiResult;
            this.orderForm = this.order.CreateFormGroup();
            this.isLoading = false;
            console.log(this.order);
            console.log(this.orderForm);
          }
        );
      }
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  submitForm() {
    /*console.log(this.orderForm);

    console.log(this.orderForm.valid);

    const controls = this.orderForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log(name + ' is invalid');
      } else if (!controls[name].valid) {
        console.log(name + ' is not valid');
      }
    }*/
    this.order.SaveFormValues(this.orderForm);
    if (this.order.id === 0) {
      console.log(this.orderForm);
      console.log(this.order);
      this.apiData.insertOrder(this.order).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Order has been created', 'Success');
        }
      );
    } else {
      this.apiData.updateOrder(this.order).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Order has been updated', 'Success');
        }
      );
    }
  }

}

