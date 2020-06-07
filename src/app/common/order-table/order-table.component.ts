import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Order, ICustomerGroup } from 'src/app/common/models';
import { OrderParams, sortOrderFields } from '../models/orderParams.model';
import { group } from '@angular/animations';
import { OrderList } from '../models/orderList.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnChanges, OnInit {
  @Input() orders: OrderList; // Order[] = [];
  @Input() ordersForm: FormGroup;
  @Input() listedFields: any[];
  @Input() filters: OrderParams;
  @Input() dataLoading = false;
  @Input() reportName = 'All Orders';

  @Output() formAction = new EventEmitter<string>();

  // public filterForm: FormGroup;
  public isFilterVisible = false;

  private sortArray = sortOrderFields;
  public sortAscending = true;
  public currentSort = '';

  // Group control variables
  @Input() groups: ICustomerGroup[] = [];
  @Output() updatedGroup = new EventEmitter<string>();
  public currentGroup: string;

  // Variables for checkbox multiselect
  private lastCheckedId: number;
  private lastChecked: boolean;

  constructor() { }

  ngOnInit() {
    this.currentGroup = this.filters.groupId === 0 ? '*' : this.filters.groupId.toString();

    let sortIdx = 0;
    if (this.filters.sort > 200 ) {
      sortIdx = this.filters.sort - 100;
      this.sortAscending = false;
    } else {
      sortIdx = this.filters.sort;
      this.sortAscending = true;
    }
    const sortField = this.sortArray.find(item => item.value === sortIdx);
    this.currentSort = sortField.description;
  }

  ngOnChanges() {
  }

  selectedGroup(groupId: any) {
    this.currentGroup = groupId;
    this.updatedGroup.emit(this.currentGroup);
  }

  checkclicked(data: any) {
    const target = data.target || data.srcElement || data.currentTarget;
    const value = target.attributes.id.nodeValue;
    const currentCheckId = +value.substring(10);
    let currentCheck = target.checked;
    if (data.ctrlKey) {
      if (this.lastCheckedId !== null) {
        let startIdx = 0;
        let endIdx = 0;
        if (this.lastCheckedId < currentCheckId) {
          startIdx = this.lastCheckedId;
          endIdx = currentCheckId;
        } else {
          startIdx = currentCheckId;
          endIdx = this.lastCheckedId;
        }
        const items = this.ordersForm.get('orders') as FormArray;
        if ((startIdx >= endIdx) || (endIdx > items.length)) { } else {
          for (let i = startIdx; i <= endIdx; i++) {
            const row = items.at(i);
            const box = row.get('scheduled');
            box.setValue(this.lastChecked);
          }
          currentCheck = this.lastChecked;
        }
      }
    }
    this.lastCheckedId = currentCheckId;
    this.lastChecked = currentCheck;
  }

  allocateDest() {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const groupObj = this.groups.find(grp => grp.id === +this.currentGroup);
    if (groupObj) {
      let dayNo = new Date().getDay() + groupObj.dayOffset % 7;
      if (dayNo === 6 ) { dayNo = 1; }
      if (dayNo === 0 ) { dayNo = 1; }
      const day = days[dayNo];
      let newDestNo = groupObj.destinationBase;
      let currentDestination = day + newDestNo.toString().padStart(2, '0');
      const items = this.ordersForm.get('orders') as FormArray;
      for (let i = 0; i < items.length; i++) {
        const row = items.at(i);
        const box = row.get('scheduled');
        const palDest = row.get('palDest');
        if (box.value && palDest.value === '') {
          while ( this.orders.usedLocations.includes(currentDestination)) {
            newDestNo++;
            currentDestination = day + newDestNo.toString().padStart(2, '0');
          }
          const existing = items.value.map( rowVal => rowVal.palDest );
          while (existing.includes(currentDestination)) {
            newDestNo++;
            currentDestination = day + newDestNo.toString().padStart(2, '0');
          }
          palDest.setValue(currentDestination);
          newDestNo++;
          currentDestination = day + newDestNo.toString().padStart(2, '0');
        }
      }
    }
  }

  saveChanges() {
    this.formAction.emit('save');
  }

  cancelAll() {
    this.formAction.emit('cancel');
  }

  setSort(sortField: string) {
    const sortfieldname = 'sort';
    if (sortField === this.currentSort) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true;
      this.currentSort = sortField;
    }
    const sortItem = this.sortArray.find(field => field.description === sortField);
    if (this.sortAscending) {
      this.filters.sort = sortItem.value;
    } else {
      this.filters.sort = sortItem.value + 100;
    }

    this.filters.sortString = sortField;
    this.filters.sortDir = this.sortAscending ? 'ASC' : 'DESC';
    this.formAction.emit('updated');
  }
}
