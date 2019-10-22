import { Component, OnInit, OnDestroy } from '@angular/core';
import { AwsDataService,
         IGBSData,
         IGBSDespData,
         WorkDateSummary,
         WorkScheduledWork,
         WorkStatusSummary } from 'src/app/common/awsData.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  private releaseSummary$: Observable<WorkDateSummary[]>;

  private isLoadingDespatch = true;
  private despatchData: WorkDateSummary[];
  private isLoadingStatus = true;
  private workStatusData: WorkStatusSummary[];

  //public sourceData: IGBSData;
  //public despHistory: IGBSDespData[];

  public despChartType = 'bar';
  public despData;
  public despLabels;
  public despOptions = {
    responsive: true,
    legend: { position: 'right'},
    scales: {
      xAxes: [{gridLines: {display: false}}],
      yAxes: [{gridLines: {display: false}}]
      }
  };

  public orderChartType = 'pie';
  public orderChartData: Array<any> = [ {data: [], label: ''}];
  public orderChartLabels = ['Awaiting', 'Despatched', 'Despatching', 'On Hold', 'Packing', 'Picking'];
  public orderChartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#616774'],
      borderWidth: 2,
    }
  ];
  public orderChartOptions = {
    responsive: true,
    legend: { position: 'right'},
  };

  constructor(private awsData: AwsDataService) { }

  ngOnInit() {
    this.releaseSummary$ = this.awsData.getWorkScheduleSummary('release');

    this.isLoadingDespatch = true;
    this.awsData.getWorkScheduleSummary('despatch').pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.despatchData = apiResult;

        this.despLabels = this.despatchData.map(x => new Date(x.date).toDateString().slice(4, 10));
        this.despData = [
          { data: this.despatchData.map(x => x.invoices), label: 'Orders' },
          { data: this.despatchData.map(x => x.lines), label: 'Lines' },
          { data: this.despatchData.map(x => x.units), label: 'Units' }
        ];

        this.isLoadingDespatch = false;
      }
    );

    this.isLoadingStatus = true;
    this.awsData.getWorkStatusSummary().pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.workStatusData = apiResult;

        this.orderChartLabels = this.workStatusData.map(x => x.status);
        this.orderChartData = [ { data: this.workStatusData.map(x => x.invoices)} ];

        this.isLoadingStatus = false;
      }
    );

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
