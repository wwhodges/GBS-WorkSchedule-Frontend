import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkScheduledWork, AwsDataService } from 'src/app/common/awsData.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  private orderId: string;
  private order: WorkScheduledWork;

  private queryParam = 'id';
  private isLoading = true;

  constructor(private awsData: AwsDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      this.orderId = params.get(this.queryParam);
      this.awsData.getWorkById(this.orderId).pipe(takeUntil(this.unsubscribe$)).subscribe(
        apiResult => {
          this.order = apiResult;
          //get customer details
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

}
