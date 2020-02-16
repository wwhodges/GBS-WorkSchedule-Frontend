import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerGroup } from 'src/app/common/models';
import { Subject } from 'rxjs';
import { ApiDataService } from 'src/app/common/services';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CompleterService, RemoteData } from 'ng2-completer';
import { ToastrService } from 'ngx-toastr';
import { OrderFilterStorage } from 'src/app/common/services/orderFilterStorage.service';
import { fieldSettings } from 'src/app/common/models/orderFields';

@Component({
  selector: 'app-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss']
})
export class ReportSettingsComponent implements OnInit, OnDestroy {

  private reportId: number;
  private queryParam = 'id';
  public report: CustomerGroup;
  public reportForm: FormGroup = new FormGroup({});
  public allFields = fieldSettings;

  private unsubscribe$: Subject<void> = new Subject();
  private unsubscribeParams$: Subject<void> = new Subject();

  public isLoading = true;

  public searchStr: string;
  public dataService: RemoteData;

  constructor(private apiData: ApiDataService,
              private route: ActivatedRoute,
              private router: Router,
              private completerService: CompleterService,
              private toastr: ToastrService,
              private filterStore: OrderFilterStorage) {
    this.dataService =
      this.completerService.remote('http://warehouseapidev.penguinrandomhouse.co.uk/api/GBSWorkSchedule/Customer/Search/',
       'account,name', 'account');

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
        this.report = new CustomerGroup();
        this.report.groupName = 'New Report';
        this.report.groupType = 'R';
        this.reportForm = this.report.CreateFormGroup();
        this.isLoading = false;
        // console.log(this.reportForm);
      } else {
        this.reportId = +params.get(this.queryParam);
        this.apiData.getCustomerGroup(this.reportId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.report = apiResult;
            this.reportForm = this.report.CreateFormGroup();
            this.isLoading = false;
            // console.log(this.reportForm);
          }
        );
      }
    });
  }

  saveGroup() {
      this.report.SaveFormValues(this.reportForm);
      this.apiData.saveCustomerGroup(this.report).subscribe(response => {
        this.toastr.success('Report settings saved successfully', 'Saved');
        if (this.report.id === 0) {
          this.report.id = +response;
          this.router.navigate(['report-settings', this.report.id]);
        }
      },
      error => {
        this.toastr.warning('A problem occurred saving the report', 'Not Saved');
      });
  }

  deleteGroup() {
    this.apiData.deleteCustomerGroup(this.report.id).subscribe(
      response => {
        this.toastr.success('Report deleted successfully', 'Deleted');
        this.router.navigate(['reports']);
      }
    );
  }

  get groupAccounts() {
    return this.reportForm.get('accounts') as FormArray;
  }

  addAccount() {
    this.apiData.getCustomer(this.searchStr).subscribe(
      response => {
        this.groupAccounts.push(new FormControl(response.account + ',' + response.name));
        // console.log(this.reportForm);
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
