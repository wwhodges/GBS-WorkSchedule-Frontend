import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICustomerGroup, CustomerGroup } from 'src/app/common/models';
import { Subject } from 'rxjs';
import { ApiDataService } from 'src/app/common/services';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControlName, FormControl } from '@angular/forms';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OrderFilterStorage } from 'src/app/common/services/orderFilterStorage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

  private groupId: number;
  private queryParam = 'id';
  public group: CustomerGroup;
  public isLoading = true;
  public groupForm: FormGroup = new FormGroup({});

  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  public searchStr: string;
  public dataService: RemoteData;

  constructor(private apiData: ApiDataService,
              private route: ActivatedRoute,
              private router: Router,
              private completerService: CompleterService,
              private toastr: ToastrService,
              private filterStore: OrderFilterStorage) {
    const apiRoot = environment.apiEndpoint + 'GBSWorkSchedule/';
    this.dataService =
      this.completerService.remote(apiRoot + 'Customer/Search/', 'account,name', 'account');

    this.dataService.descriptionField('name');
    this.dataService.requestOptions({withCredentials: true});
    }

  ngOnInit() {
    this.filterStore.currentPage = '';
    this.filterStore.currentFilter = '';
    this.loadData();
  }

  loadData() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeParams$)).subscribe((params) => {
      this.unsubscribe$.next();
      this.isLoading = true;
      if (params.get(this.queryParam) === 'new') {
        this.group = new CustomerGroup();
        this.groupForm = this.group.CreateFormGroup();
        this.isLoading = false;
      } else {
        this.groupId = +params.get(this.queryParam);
        this.apiData.getCustomerGroup(this.groupId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.group = apiResult;
            this.groupForm = this.group.CreateFormGroup();
            this.isLoading = false;
            console.log(this.group);
            console.log(this.groupForm);
          }
        );
      }
    });
  }

  saveGroup() {
      this.group.SaveFormValues(this.groupForm);
      console.log(this.groupForm);
      console.log(this.group);
      this.apiData.saveCustomerGroup(this.group).subscribe(response => {
        // console.log(response);
        this.toastr.success('Group saved successfully', 'Saved');
        if (this.group.id === 0) {
          this.group.id = +response;
          this.router.navigate(['group', this.group.id]);
        }
      },
      error => {
        this.toastr.warning('A problem occurred saving the group', 'Not Saved');
      });
  }

  deleteGroup() {
    this.apiData.deleteCustomerGroup(this.group.id).subscribe(
      response => {
        this.toastr.success('Group deleted successfully', 'Deleted');
        this.router.navigate(['groups']);
      }
    );
  }

  get groupAccounts() {
    return this.groupForm.get('accounts') as FormArray;
  }

  addAccount() {
    this.apiData.getCustomer(this.searchStr).subscribe(
      response => {
        this.groupAccounts.push(new FormControl(response.account + ',' + response.name));
        console.log(this.groupForm);
      }
    );
  }

  removeAccount(index: number) {
    this.groupAccounts.removeAt(index);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();
  }


}
