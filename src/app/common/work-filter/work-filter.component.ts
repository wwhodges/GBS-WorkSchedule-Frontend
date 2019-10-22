import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IWorkParams } from '../models/workParams.model';

@Component({
  selector: 'app-work-filter',
  templateUrl: './work-filter.component.html',
  styleUrls: ['./work-filter.component.scss']
})
export class WorkFilterComponent implements OnInit, OnChanges {
  @Input() workParams: IWorkParams;
  private isFilterVisible = false;

  private filters = {
    despatched: true,
    unstarted: false,
    picked: true,
    dateRange: {
      from: '',
      to: '',
      by: 'invoice'
    }
  };

  constructor() { }

  ngOnChanges() {
    this.filters.unstarted = this.workParams.INCLUDE_UNSTARTED;
    this.filters.despatched = this.workParams.INCLUDE_DESPATCHED;
    this.filters.picked = this.workParams.INCLUDE_PARTPACKED;
  }
  ngOnInit() {
  }

  updateFilter() {
    console.log(this.filters);
    this.workParams.INCLUDE_UNSTARTED = this.filters.unstarted;
    this.workParams.INCLUDE_DESPATCHED = this.filters.despatched;
    this.workParams.INCLUDE_PARTPICKED = this.filters.picked;
  }

}
