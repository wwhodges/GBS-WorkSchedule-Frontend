import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WorkScheduledWork } from 'src/app/common/awsData.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { IWorkParams } from 'src/app/common/models/workParams.model';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.scss']
})
export class WorkTableComponent implements OnInit, OnChanges {
  @Input() workItems: WorkScheduledWork[] = [];

  workTableForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {}

  ngOnChanges() {
    this.workTableForm = this.fb.group({
      workItems: this.fb.array(this.workItems.map((item) => this.createWorkItemGroup(item)))
    });
    console.log(this.workTableForm);
  }

  createWorkItemGroup(workItem: WorkScheduledWork): FormGroup {

    const blankDate = new Date('0001-01-01');
    //console.log('wd',workItem.workDate,'bd',blankDate.toISOString().substring(0,19));
    //console.log(workItem.workDate.toString() === blankDate.toISOString().substring(0,19));
    const group = this.fb.group({
      workId: [workItem.workId],
      destination: [workItem.destination],
      workDate: [workItem.workDate.toString() === blankDate.toISOString().substring(0,19) ?
        new Date().toISOString().substring(0, 10) :
        new Date(workItem.workDate).toISOString().substring(0, 10)],
      despDate: [workItem.despDate.toString() === blankDate.toISOString().substring(0,19) ?
        new Date().toISOString().substring(0, 10) :
        new Date(workItem.despDate).toISOString().substring(0, 10)],
      delDate: [workItem.delDate.toString() === blankDate.toISOString().substring(0,19) ?
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10) :
        new Date(workItem.delDate).toISOString().substring(0, 10)],
      addToSchedule: [!workItem.scheduleId ? true : false]
    });
    return group;
  }
}
