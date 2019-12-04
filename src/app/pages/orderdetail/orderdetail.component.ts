import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/common/models';
import { ApiDataService } from 'src/app/common/services';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  private queryParam = 'id';
  public isLoading = true;

  public orderForm: FormGroup;

  constructor(private apiData: ApiDataService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      this.orderId = params.get(this.queryParam);
      if (this.orderId === 'new') {
        this.order = new Order();
        this.orderForm = this.order.CreateFormGroup();
        this.isLoading = false;
      } else {
        this.apiData.getOrderById(this.orderId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.order = apiResult;
            this.orderForm = this.order.CreateFormGroup();
            this.isLoading = false;
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
    this.order.SaveFormValues(this.orderForm);
    if (this.order.id === 0) {
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

