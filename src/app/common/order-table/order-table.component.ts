import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Order, ICustomerGroup, IWorkParams, sortFields } from 'src/app/common/models';
import { OrderParams } from '../models/orderParams.model';
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

  private sortArray = sortFields;
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
    const sortField = this.sortArray.find(item => item.value === this.filters.sort);
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
    console.log(groupObj);
    if (groupObj) {
      const day = days[new Date().getDay() + groupObj.dayOffset % 7];
      let newDestNo = groupObj.destinationBase + 1;
      let currentDestination = day + newDestNo.toString();
      console.log(currentDestination);
      const items = this.ordersForm.get('orders') as FormArray;
      for (let i = 0; i < items.length; i++) {
        const row = items.at(i);
        const box = row.get('scheduled');
        const palDest = row.get('palDest');
        if (box.value && palDest.value === '') {
          while ( this.orders.usedLocations.includes(currentDestination)) {
            console.log('skipping ' + currentDestination);
            newDestNo++;
            currentDestination = day + newDestNo.toString();
          }
          palDest.setValue(currentDestination);
          newDestNo++;
          currentDestination = day + newDestNo.toString();
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
