import { Component, OnInit, Input, OnChanges, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderParams } from '../models/orderParams.model';
import { vistaStatusField, statusField } from '../models/orderFields';
import { OrderFilterStorage } from '../services/orderFilterStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss']
})
export class OrderFilterComponent implements OnInit, OnChanges {
  public orderFilter: OrderParams;
  @Input() orderFilterForm: FormGroup;

  public updateButton = false;

  public vistaStatusOptions = vistaStatusField.options;
  public statusOptions = statusField.options;
  public marketOptions = ['H', 'X'];
  public siteOptions = ['G'];

  public paramSection = 0;
  public currentPage: string;

  constructor(private filterStore: OrderFilterStorage,
              private router: Router) { }


  changeParam(page: number) {
        this.paramSection = page;
  }

  ngOnInit() {
    //this.orderFilter = new OrderParams();
    //console.log(this.filterStore.currentFilter);
    if (this.filterStore.currentFilter) {
      //console.log(this.orderFilter);
      this.orderFilter = new OrderParams();
      Object.assign(this.orderFilter, JSON.parse(this.filterStore.currentFilter));
      //console.log(this.orderFilter);
      this.orderFilterForm = this.orderFilter.CreateFormGroup();
      this.updateButton = true;
      this.currentPage = this.filterStore.currentPage;
    }
    if (!this.orderFilterForm) {
      this.orderFilterForm = new OrderParams().CreateFormGroup();
      this.router.navigate(['/']);
    }
    //console.log(this.orderFilterForm);
  }

  ngOnChanges() {
  }

  filterUpdated() {
    Object.assign(this.orderFilter, this.orderFilterForm.value);
    this.filterStore.currentFilter = JSON.stringify(this.orderFilter);
    this.router.navigate([this.currentPage]);
  }

}
