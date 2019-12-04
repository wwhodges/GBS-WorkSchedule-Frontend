import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  public chartType = 'pie';
  @Input() chartName: string;
  @Input() chartDatasets: Array<any>;
  @Input() chartLabels: Array<any>;
  @Input() chartOptions: Array<any>;

  public pchartDatasets = [
    { data: [23, 312, 1, 0, 37, 0], label: 'Orders' }
  ];

  public pchartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey', 'Other'];

  public pchartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#616774'],
      borderWidth: 2,
    }
  ];

  public pchartOptions: any = {
    responsive: true
  };
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}

