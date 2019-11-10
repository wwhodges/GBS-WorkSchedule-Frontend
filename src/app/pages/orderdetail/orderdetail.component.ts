import { Component, OnInit, OnDestroy } from '@angular/core';
import { IOrder } from 'src/app/common/models';
import { ApiDataService } from 'src/app/common/services';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

export class Order implements IOrder {
  site: string;
  invoice: string;
  batch: string;
  doc: string;
  account: string;
  invWeight: number;
  units: number;
  lines: number;
  pickedQty: number;
  pickedBulk: number;
  pickedLoose: number;
  vistaPicked: boolean;
  vistaPacked: boolean;
  vistaStatus: string;
  dateDespatchedActual: Date;
  dateInvoiced: Date;
  scheduled: boolean;
  palDest: string;
  name: string;
  prime: string;
  id: number;
  workId: number;
  destination: string;
  ALP: string;
  bench: string;
  priority: string;
  picked: boolean;
  packed: boolean;
  holdLoc: string;
  palconPacked: number;
  status: string;
  comments: string;
  workDate: Date;
  delDate: Date;
  despDate: Date;
  palletIds: string;
  palletCount: number;
  palletNumbers: string;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}


@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  private orderId: string;
  private order: IOrder;

  private queryParam = 'id';
  private isLoading = true;

  private scheduleForm: FormGroup;

  constructor(private apiData: ApiDataService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      this.orderId = params.get(this.queryParam);
      this.apiData.getOrderById(this.orderId).pipe(takeUntil(this.unsubscribe$)).subscribe(
        apiResult => {
          this.order = apiResult;
          this.CreateScheduleForm();
          this.isLoading = false;
          console.log(this.order);
        }
      );
    });
  }

  CreateScheduleForm() {
    this.scheduleForm = this.fb.group({
      id: [this.order.id],
      destination: [this.order.palDest],
      ALP: [this.order.ALP],
      bench: [this.order.bench],
      priority: [this.order.priority],
      picked: [this.order.picked],
      packed: [this.order.packed],
      holdLoc: [this.order.holdLoc],
      palconPacked: [this.order.palconPacked],
      status: [this.order.status],
      comments: [this.order.comments],
      workDate: [this.order.workDate],
      delDate: [this.order.delDate],
      despDate: [this.order.despDate],
      palletIds: [this.order.palletIds],
      palletCount: [this.order.palletCount],
      palletNumbers: [this.order.palletNumbers]
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  submitForm() {
    console.log(this.scheduleForm);
    const sched = new Order(this.scheduleForm.value);
    console.log(sched);
    this.apiData.insertOrder(sched).subscribe( response => { console.log(response); }, errormsg => {console.log(errormsg); });
  }

}

