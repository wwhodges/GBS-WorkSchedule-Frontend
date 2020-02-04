import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { WorkParams } from '../models/workParams.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-filter',
  templateUrl: './work-filter.component.html',
  styleUrls: ['./work-filter.component.scss']
})
export class WorkFilterComponent implements OnInit, OnChanges {
  @Input() workParams: WorkParams;
  @Input() isFilterVisible = false;
  @Output() updatedFilter = new EventEmitter();

  public workParamsForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.workParamsForm = this.workParams.CreateFormGroup();
  }

  ngOnChanges() {
    this.workParamsForm = this.workParams.CreateFormGroup();
  }

  updateFilter() {
    this.isFilterVisible = false;
    this.workParams.SaveFormValues(this.workParamsForm);
    if (this.workParams.DATE_FROM === null && this.workParams.DATE_TO === null) {
      this.workParams.DATE_RANGE = '';
    }
    this.updatedFilter.emit();
  }

}
