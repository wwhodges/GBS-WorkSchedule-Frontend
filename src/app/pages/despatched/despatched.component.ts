import { Component, OnInit, OnDestroy } from '@angular/core';
import { AwsDataService, WorkScheduleGroupWork, WorkScheduledWork, WorkScheduleGroup } from 'src/app/common/awsData.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-despatched',
  templateUrl: './despatched.component.html',
  styleUrls: ['./despatched.component.scss']
})
export class DespatchedComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  private unscheduledWork: WorkScheduleGroupWork[];
  private workList: WorkScheduledWork[];

  private workForm: FormGroup = new FormGroup({});

  private popupVisible = false;

  constructor(private awsData: AwsDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.awsData.getWorkGroupUnscheduled().pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.unscheduledWork = apiResult;
        this.setupForm();
        console.log(this.unscheduledWork);
      });
  }

  setupForm() {
    this.workForm = new FormGroup({
      groups: this.fb.array(this.unscheduledWork.map((group) => this.createWorkGroupGroup(group)))
    });
    console.log(this.workForm);
    this.workForm.valueChanges.subscribe((data) => this.changeval(data));
  }

  clickedRow($event) {
    console.log($event);
  }

  changeval(data: any) {
    let valuechanged = false;
    Object.keys(this.workForm.controls).forEach(key => {
      const originalval = this.workList.find((item) => item.workId.toString() === key);
      const formval = this.workForm.controls[key].value;
      if (( formval.destination !== originalval.destination) || (formval.addToSchedule === true)) {
        valuechanged = true;
      }
    });
    this.popupVisible = valuechanged;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  cancelAll() {
    this.setupForm();
  }

  selectRanges() {
    const keyName = 'addToSchedule';
    let checked = false;
    this.unscheduledWork.forEach((group) => group.work.forEach((work) => {
      const formcont = this.workForm.get(work.workId.toString()).get(keyName);
      if ( formcont.value === true) {
        checked = !checked;
        } else {
          formcont.setValue(checked);
      }
    }));
  }

  allocateDest() {
    const keyName = 'destination';
    const day = 'TUE';
    let slot = 0;
    this.unscheduledWork.forEach((group) => {
      slot = group.group.destinationBase;
      group.work.forEach((work) => {
        const formcont = this.workForm.get(work.workId.toString()).get(keyName);
        formcont.setValue(day + slot.toString());
        slot++;
      });
    });
  }

  createWorkGroupGroup(workGroup: WorkScheduleGroupWork): FormGroup {
    const wg = this.fb.group({
      groupId: [workGroup.group.id],
      groupName: [workGroup.group.groupName],
      workItems: this.fb.array(workGroup.work.map((item) => this.createWorkItemGroup(item)))
    });
    return wg;
  }

  createWorkItemGroup(workItem: WorkScheduledWork): FormGroup {
    const blankDate = new Date('0001-01-01');
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
