import { Component, OnInit, OnDestroy } from '@angular/core';
import { AwsDataService, WorkScheduleGroupWork, WorkScheduledWork } from 'src/app/common/awsData.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-unscheduled',
  templateUrl: './unscheduled.component.html',
  styleUrls: ['./unscheduled.component.scss']
})
export class UnscheduledComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  private unscheduledWork: WorkScheduleGroupWork[];
  private workList: WorkScheduledWork[];

  private workForm: FormGroup = new FormGroup({});

  private popupVisible = false;

  constructor(private awsData: AwsDataService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.awsData.getWorkGroupUnscheduled().pipe(takeUntil(this.unsubscribe$)).subscribe(
      apiResult => {
        this.unscheduledWork = apiResult;
        this.workList = flattenWork(this.unscheduledWork);
        this.setupForm();
      });
  }

  setupForm() {
    this.workForm = new FormGroup({});
    const today = new Date();
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setDate(today.getDate() + 1);
    this.unscheduledWork.forEach((group) => group.work.forEach((work) => {
        work.workDate = new Date(today.toDateString());
        work.delDate = new Date(tomorrow.toDateString());
        work.despDate = new Date(today.toDateString());
        this.workForm.addControl(work.workId.toString(), new FormGroup({
          destination: new FormControl(work.destination),
          workDate: new FormControl(work.workDate.toISOString().substring(0, 10)),
          despDate: new FormControl(work.despDate.toISOString().substring(0, 10)),
          delDate: new FormControl(work.delDate.toISOString().substring(0, 10)),
          addToSchedule: new FormControl(false)
        }));
      }
      ));
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


}

function flattenWork(array: WorkScheduleGroupWork[]) {
    let result: WorkScheduledWork[] = [];
    array.forEach((item) => { result = result.concat(item.work); } );
    return result;
}
