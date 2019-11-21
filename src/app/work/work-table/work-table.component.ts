import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IOrder, ICustomerGroup } from 'src/app/common/models';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.scss']
})
export class WorkTableComponent implements OnChanges, OnInit {
  @Input() workItems: IOrder[] = [];
  @Input() groups: ICustomerGroup[] = [];
  @Output() updatedGroup = new EventEmitter<string>();

  private currentGroup = '*';

  workTableForm: FormGroup;
  private lastCheckedId: number;
  private lastChecked: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // console.log('wt init');
  }
  ngOnChanges() {
    this.workTableForm = this.fb.group({
      workItems: this.fb.array(this.workItems.map((item) => this.createWorkItemGroup(item)))
    });
    //console.log(this.workItems);
    //console.log(this.workTableForm);
    // console.log(this.workTableForm);
    // console.log('wt curr grp' + this.currentGroup);
  }

  selectedGroup(group: any) {
    // console.log('grp selected ' + group);
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
        if ( this.lastCheckedId < currentCheckId ) {
          startIdx = this.lastCheckedId;
          endIdx = currentCheckId;
        } else {
          startIdx = currentCheckId;
          endIdx = this.lastCheckedId;
        }
        const items = this.workTableForm.get('workItems') as FormArray;
        if ( (startIdx >= endIdx) || (endIdx > items.length)) {} else {
          for (let i = startIdx; i <= endIdx; i++) {
            const row = items.at(i);
            const box = row.get('addToSchedule');
            box.setValue(this.lastChecked);
          }
          currentCheck = this.lastChecked;
        }
      }
    }
    this.lastCheckedId = currentCheckId;
    this.lastChecked = currentCheck;
  }

  createWorkItemGroup(workItem: IOrder): FormGroup {
    const group = this.fb.group({
      id: [workItem.id],
      palDest: [workItem.palDest],
      workDate: [new Date(workItem.workDate).toISOString().substring(0, 10)],
      despDate: [new Date(workItem.despDate).toISOString().substring(0, 10)],
      delDate: [new Date(workItem.delDate).toISOString().substring(0, 10)],
      addToSchedule: [workItem.scheduled]
    });
    return group;
  }
}
