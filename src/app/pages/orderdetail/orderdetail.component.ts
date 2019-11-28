import { Component, OnInit, OnDestroy } from '@angular/core';
import { IOrder, Order } from 'src/app/common/models';
import { ApiDataService } from 'src/app/common/services';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  private orderId: string;
  private order: Order;

  private queryParam = 'id';
  private isLoading = true;

  private orderForm: FormGroup;

  constructor(private apiData: ApiDataService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      this.orderId = params.get(this.queryParam);
      this.apiData.getOrderById(this.orderId).pipe(takeUntil(this.unsubscribe$)).subscribe(
        apiResult => {
          this.order = apiResult;
          this.orderForm = this.order.CreateFormGroup();
          this.isLoading = false;
          console.log(this.order);
        }
      );
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  submitForm() {
    // console.log(this.orderForm);
    const sched = new Order().deserialise(this.orderForm.value);
    // console.log(sched);
    this.apiData.insertOrder(sched).subscribe( response => { console.log(response); }, errormsg => {console.log(errormsg); });
  }

}

