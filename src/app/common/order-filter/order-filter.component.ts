import { Component, OnInit, Input, OnChanges, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderParams } from '../models/orderParams.model';
import { vistaStatusField, statusField } from '../models/orderFields';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss']
})
export class OrderFilterComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  // @Input() orderFilter: OrderParams;
  @Input() orderFilterForm: FormGroup;
  @Input() isFilterVisible = true;
  @Input() updateButton = false;
  @Output() updatedFilter = new EventEmitter();

  @Input() showScheduleOptions = false;
  @Input() showSiteOptions = false;

  public vistaStatusOptions = vistaStatusField.options;
  public statusOptions = statusField.options;
  public marketOptions = ['H', 'X'];
  public siteOptions = ['G'];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    console.log('ng init');
    // this.orderFilter = new OrderParams();
    // this.orderFilterForm = this.orderFilter.CreateFormGroup();
  }

  ngOnChanges() {
    // this.workParamsForm = this.workParams.CreateFormGroup();
    console.log('ng change');
    console.log(this.orderFilterForm);
  }

  filterUpdated() {
    console.log(this.orderFilterForm);
    // this.isFilterVisible = false;
    // this.workParams.SaveFormValues(this.workParamsForm);
    // if (this.workParams.DATE_FROM === null && this.workParams.DATE_TO === null) {
    //   this.workParams.DATE_RANGE = '';
    // }
    this.updatedFilter.emit();
  }
}
