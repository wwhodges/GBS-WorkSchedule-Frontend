import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { IOrderSummary } from 'src/app/common/models';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public isLoadingRelease = true;
  public releaseData: IOrderSummary[];
  public isLoadingDespatch = true;
  public despatchData: IOrderSummary[];
  public isLoadingStatus = true;
  public workStatusData: IOrderSummary[];
  public isLoadingScheduleStatus = true;
  public scheduleStatusData: IOrderSummary[];

  public relChartType = 'bar';
  public relData;
  public relLabels;
  public relOptions = {
    responsive: true,
    legend: { position: 'right'},
    scales: {
      xAxes: [{gridLines: {display: false}}],
      yAxes: [{gridLines: {display: false}}]
      }
  };

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
  public orderChartData = [];
  public orderChartLabels = [];
  public schChartData = [];
  public schChartLabels = [];
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

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.isLoadingRelease = true;
    this.apiData.getOrderSummary('Released').pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.releaseData = apiResult;

        this.relLabels = this.releaseData.reverse().map(x => new Date(x.key).toDateString().slice(4, 10));
        this.relData = [
          { data: this.releaseData.reverse().map(x => x.invoices), label: 'Orders' },
          { data: this.releaseData.reverse().map(x => x.lines), label: 'Lines' },
          { data: this.releaseData.reverse().map(x => x.units), label: 'Units' }
        ];
        this.isLoadingRelease = false;
      }
    );
    this.isLoadingDespatch = true;
    this.apiData.getOrderSummary('Despatched').pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.despatchData = apiResult;

        this.despLabels = this.despatchData.reverse().map(x => new Date(x.key).toDateString().slice(4, 10));
        this.despData = [
          { data: this.despatchData.reverse().map(x => x.invoices), label: 'Orders' },
          { data: this.despatchData.reverse().map(x => x.lines), label: 'Lines' },
          { data: this.despatchData.reverse().map(x => x.units), label: 'Units' }
        ];
        this.isLoadingDespatch = false;
      }
    );

    this.isLoadingStatus = true;
    this.apiData.getOrderSummary('VistaStatus').pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.workStatusData = apiResult;

        this.orderChartLabels = this.workStatusData.map(x => x.key);
        this.orderChartData = [ { data: this.workStatusData.map(x => x.invoices)} ];

        this.isLoadingStatus = false;
      }
    );

    this.isLoadingScheduleStatus = true;
    this.apiData.getOrderSummary('Status').pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.scheduleStatusData = apiResult;

        this.schChartLabels = this.scheduleStatusData.map(x => x.key);
        this.schChartData = [ { data: this.scheduleStatusData.map(x => x.invoices)} ];

        this.isLoadingScheduleStatus = false;
      }
    );

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
