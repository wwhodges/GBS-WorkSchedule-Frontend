import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Order, ICustomerGroup, IWorkParams } from 'src/app/common/models';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnChanges, OnInit {
  @Input() orders: Order[] = [];
  @Input() ordersForm: FormGroup;
  @Input() listedFields: any[];
  @Input() filters: IWorkParams;

  @Output() formAction = new EventEmitter<string>();

  private isFilterVisible = false;


  // Group control variables
  @Input() groups: ICustomerGroup[] = [];
  @Output() updatedGroup = new EventEmitter<string>();
  private currentGroup = '*';

  // Variables for checkbox multiselect
  private lastCheckedId: number;
  private lastChecked: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  selectedGroup(group: any) {
    this.currentGroup = group;
    this.updatedGroup.emit(this.currentGroup);
  }

  checkclicked(data: any) {
    const target = data.target || data.srcElement || data.currentTarget;
    const value = target.attributes.id.nodeValue;
    const currentCheckId = +value.substring(4);
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
    const day = days[new Date().getDay()];
    let newDestNo = 1;
    const items = this.ordersForm.get('orders') as FormArray;
    for (let i = 0; i < items.length; i++) {
      const row = items.at(i);
      const box = row.get('scheduled');
      const palDest = row.get('palDest');
      if (box.value) {
        palDest.setValue(day + newDestNo++);
      }
    }
  }

  saveChanges() {
    console.log('emit to save');
    this.formAction.emit('save');
  }

  cancelAll() {
    console.log('emit to cancel');
    this.formAction.emit('cancel');
  }

  filterUpdated() {
    this.formAction.emit('updated');
  }
}
