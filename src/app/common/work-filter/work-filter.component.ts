import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { IWorkParams } from '../models/workParams.model';

@Component({
  selector: 'app-work-filter',
  templateUrl: './work-filter.component.html',
  styleUrls: ['./work-filter.component.scss']
})
export class WorkFilterComponent implements OnInit, OnChanges {
  @Input() workParams: IWorkParams;
  @Input() isFilterVisible = false;

  @Output() updatedFilter = new EventEmitter();


  public filters = {
    scheduled: true,
    unscheduled: true,
    vista_despatched: true,
    vista_partDespatched: true,
    vista_unstarted: false,
    vista_partPicked: true,
    vista_partPacked: true,

    despatched: true,
    inProgress: true,
    unstarted: true,
    complete: true,
    prepared: true,
    onhold: true,
    other: true,

    weight: {
      min: 0,
      max: 0
    },
    dateRange: {
      from: '',
      to: '',
      by: 'invoice'
    }
  };

  constructor() { }

  ngOnChanges() {
    this.filters.scheduled = this.workParams.INCLUDE_SCHEDULED;
    this.filters.unscheduled = this.workParams.INCLUDE_UNSCHEDULED;

    this.filters.vista_despatched = this.workParams.INCLUDE_V_DESPATCHED;
    this.filters.vista_unstarted = this.workParams.INCLUDE_V_UNSTARTED;
    this.filters.vista_despatched = this.workParams.INCLUDE_V_DESPATCHED;
    this.filters.vista_partPicked = this.workParams.INCLUDE_V_PARTPICKED;
    this.filters.vista_partPacked = this.workParams.INCLUDE_V_PARTPACKED;
    this.filters.vista_partDespatched = this.workParams.INCLUDE_V_PARTDESPATCHED;

    this.filters.despatched = this.workParams.INCLUDE_DESPATCHED;
    this.filters.unstarted = this.workParams.INCLUDE_UNSTARTED;
    this.filters.prepared = this.workParams.INCLUDE_PREPARED;
    this.filters.onhold = this.workParams.INCLUDE_ONHOLD;
    this.filters.other = this.workParams.INCLUDE_OTHER;
    this.filters.complete = this.workParams.INCLUDE_COMPLETE;
    this.filters.inProgress = this.workParams.INCLUDE_INPROGRESS;

    this.filters.weight.max = this.workParams.MAX_WEIGHT;
    this.filters.weight.min = this.workParams.MIN_WEIGHT;
    this.filters.dateRange.from = this.workParams.DATE_FROM;
    this.filters.dateRange.to = this.workParams.DATE_TO;
    this.filters.dateRange.by = this.workParams.DATE_RANGE;
  }

  ngOnInit() {
  }

  updateFilter() {
    // console.log(this.filters);
    this.isFilterVisible = false;
    this.workParams.INCLUDE_SCHEDULED = this.filters.scheduled;
    this.workParams.INCLUDE_UNSCHEDULED = this.filters.unscheduled;

    this.workParams.INCLUDE_V_UNSTARTED = this.filters.vista_unstarted;
    this.workParams.INCLUDE_V_DESPATCHED = this.filters.vista_despatched;
    this.workParams.INCLUDE_V_PARTPICKED = this.filters.vista_partPicked;
    this.workParams.INCLUDE_V_PARTPACKED = this.filters.vista_partPacked;
    this.workParams.INCLUDE_V_PARTDESPATCHED = this.filters.vista_partDespatched;

    this.workParams.INCLUDE_COMPLETE = this.filters.complete;
    this.workParams.INCLUDE_DESPATCHED = this.filters.despatched;
    this.workParams.INCLUDE_INPROGRESS = this.filters.inProgress;
    this.workParams.INCLUDE_ONHOLD = this.filters.onhold;
    this.workParams.INCLUDE_PREPARED = this.filters.prepared;
    this.workParams.INCLUDE_UNSTARTED = this.filters.unstarted;
    this.workParams.INCLUDE_OTHER = this.filters.other;

    this.workParams.MAX_WEIGHT = this.filters.weight.max;
    this.workParams.MIN_WEIGHT = this.filters.weight.min;
    this.workParams.DATE_FROM = this.filters.dateRange.from;
    this.workParams.DATE_TO = this.filters.dateRange.to;
    this.workParams.DATE_RANGE = this.filters.dateRange.by;

    if (this.workParams.DATE_FROM === null && this.workParams.DATE_TO === null) {
      this.workParams.DATE_RANGE = '';
    }

    this.updatedFilter.emit();
  }

}
