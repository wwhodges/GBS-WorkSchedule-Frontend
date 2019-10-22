import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public chartType = 'bar';
  @Input() chartName: string;
  @Input() chartDatasets: Array<any>;
  @Input() chartLabels: Array<any>;
  @Input() chartOptions: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}

