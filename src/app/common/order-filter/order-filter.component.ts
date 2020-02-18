import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderParams, sortOrderFields } from '../models/orderParams.model';
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
  public sortOptions = sortOrderFields;
  public sortOrders = [{description: 'Ascending', value: 'ASC'}, {description: 'Descending', value: 'DESC'}];

  public paramSection = 0;
  public currentPage: string;

  constructor(private filterStore: OrderFilterStorage,
              private router: Router) { }


  changeParam(page: number) {
        this.paramSection = page;
  }

  ngOnInit() {
    if (this.filterStore.currentFilter) {
      this.orderFilter = new OrderParams();
      Object.assign(this.orderFilter, JSON.parse(this.filterStore.currentFilter));
      this.orderFilterForm = this.orderFilter.CreateFormGroup();
      this.updateButton = true;
      this.currentPage = this.filterStore.currentPage;
    }
    if (!this.orderFilterForm) {
      this.orderFilterForm = new OrderParams().CreateFormGroup();
      this.router.navigate(['/']);
    }
    this.orderFilterForm.get('sortString').valueChanges.subscribe( () => this.sortChanged());
    this.orderFilterForm.get('sortDir').valueChanges.subscribe( () => this.sortChanged());
  }

  ngOnChanges() {
  }

  sortChanged() {
    let sortValue = this.sortOptions.find( srt => srt.description === this.orderFilterForm.get('sortString').value).value;
    if (this.orderFilterForm.get('sortDir').value === 'DESC') { sortValue += 100; }
    this.orderFilterForm.get('sort').setValue(sortValue);
  }

  filterUpdated() {
    Object.assign(this.orderFilter, this.orderFilterForm.value);
    this.filterStore.currentFilter = JSON.stringify(this.orderFilter);
    this.router.navigate([this.currentPage]);
  }

}
