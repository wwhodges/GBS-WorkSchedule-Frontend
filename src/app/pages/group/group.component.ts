import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICustomerGroup } from 'src/app/common/models';
import { Subject } from 'rxjs';
import { ApiDataService } from 'src/app/common/services';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

  private groupId: number;
  private queryParam = 'id';
  private group: ICustomerGroup;
  private isLoading = true;
  private groupForm: FormGroup = new FormGroup({});

  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  private searchStr: string;
  private dataService: RemoteData;

  constructor(private apiData: ApiDataService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private completerService: CompleterService) {
    this.dataService =
      this.completerService.remote('https://ukwwhdappdi001/api/GBSWorkSchedule/Customer/Search/', 'account,name', 'account');

    this.dataService.descriptionField('name');
    this.dataService.requestOptions({withCredentials: true});
    }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      if (params.get(this.queryParam) === 'new') {
        this.group = {
          id: 0,
          groupName: 'New Group',
          minWeight: 0,
          groupByAcct: false,
          destinationBase: 0,
          unscheduledOrder: 0,
          members: []
        };
        this.CreateFormGroup();
        this.isLoading = false;
      } else {
        this.groupId = +params.get(this.queryParam);
        this.apiData.getCustomerGroup(this.groupId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.group = apiResult;
            this.CreateFormGroup();
            this.isLoading = false;
            console.log(this.group);
          }
        );
      }
    });
  }

  CreateFormGroup() {
    this.groupForm = this.fb.group({
      id: [this.group.id],
      groupName: [this.group.groupName],
      groupByAcct: [this.group.groupByAcct],
      minWeight: [this.group.minWeight],
      destinationBase: [this.group.destinationBase]
    });
  }

  UpdateFromForm() {
    this.group.groupName = this.groupForm.get('groupName').value;
    this.group.groupByAcct = this.groupForm.get('groupByAcct').value;
    this.group.minWeight = this.groupForm.get('minWeight').value;
    this.group.destinationBase = this.groupForm.get('destinationBase').value;
  }

  saveGroup() {
      this.UpdateFromForm();
      this.apiData.saveCustomerGroup(this.group).subscribe(response => {console.log(response)});
  }

  deleteGroup() {
    this.apiData.deleteCustomerGroup(this.group.id).subscribe();
  }

  addAccount() {
    this.group.members.push(this.searchStr);
  }

  removeMember(member: string) {
    const index = this.group.members.indexOf(member);
    if (index > -1) {
      this.group.members.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();
  }


}