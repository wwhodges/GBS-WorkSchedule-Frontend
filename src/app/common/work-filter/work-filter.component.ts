import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { IWorkParams } from '../models/workParams.model';

@Component({
  selector: 'app-work-filter',
  templateUrl: './work-filter.component.html',
  styleUrls: ['./work-filter.component.scss']
})
export class WorkFilterComponent implements OnInit, OnChanges {
  @Input() workParams: IWorkParams;
  @Output() updatedFilter = new EventEmitter();
  private isFilterVisible = false;

  private filters = {
    scheduled: true,
    unscheduled: true,
    despatched: true,
    partDespatched: true,
    unstarted: false,
    partPicked: true,
    partPacked: true,
    weight: {
      min: 0,
      max: 0
    },
    dateRange: {
      from: new Date(),
      to: new Date(),
      by: 'invoice'
    }
  };

  constructor() { }

  ngOnChanges() {
    this.filters.scheduled = this.workParams.INCLUDE_SCHEDULED;
    this.filters.unscheduled = this.workParams.INCLUDE_UNSCHEDULED;
    this.filters.unstarted = this.workParams.INCLUDE_UNSTARTED;
    this.filters.despatched = this.workParams.INCLUDE_DESPATCHED;
    this.filters.partPicked = this.workParams.INCLUDE_PARTPICKED;
    this.filters.partPacked = this.workParams.INCLUDE_PARTPACKED;
    this.filters.partDespatched = this.workParams.INCLUDE_PARTDESPATCHED;
    this.filters.weight.max = this.workParams.MAX_WEIGHT;
    this.filters.weight.min = this.workParams.MIN_WEIGHT;
    this.filters.dateRange.from = this.workParams.DATE_FROM;
    this.filters.dateRange.to = this.workParams.DATE_TO;
    this.filters.dateRange.by = this.workParams.DATE_RANGE;
  }

  ngOnInit() {
  }

  updateFilter() {
    console.log(this.filters);
    this.isFilterVisible = false;
    this.workParams.INCLUDE_SCHEDULED = this.filters.scheduled;
    this.workParams.INCLUDE_UNSCHEDULED = this.filters.unscheduled;
    this.workParams.INCLUDE_UNSTARTED = this.filters.unstarted;
    this.workParams.INCLUDE_DESPATCHED = this.filters.despatched;
    this.workParams.INCLUDE_PARTPICKED = this.filters.partPicked;
    this.workParams.INCLUDE_PARTPACKED = this.filters.partPacked;
    this.workParams.INCLUDE_PARTDESPATCHED = this.filters.partDespatched;
    this.workParams.MAX_WEIGHT = this.filters.weight.max;
    this.workParams.MIN_WEIGHT = this.filters.weight.min;
    this.workParams.DATE_FROM = this.filters.dateRange.from;
    this.workParams.DATE_TO = this.filters.dateRange.to;
    this.workParams.DATE_RANGE = this.filters.dateRange.by;

    this.updatedFilter.emit();
  }

}
