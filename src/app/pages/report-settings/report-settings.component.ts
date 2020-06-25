import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerGroup, OrderParams } from 'src/app/common/models';
import { Subject } from 'rxjs';
import { ApiDataService } from 'src/app/common/services';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CompleterService, RemoteData } from 'ng2-completer';
import { ToastrService } from 'ngx-toastr';
import { OrderFilterStorage } from 'src/app/common/services/orderFilterStorage.service';
import { fieldSettings, IFieldSettings, defaultScheduledFields, invoiceField } from 'src/app/common/models/orderFields';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { environment } from '../../../environments/environment';

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
    const apiRoot = environment.apiEndpoint + 'GBSWorkSchedule/';
    this.dataService =
      this.completerService.remote(apiRoot + 'Customer/Search/', 'account,name', 'account');

    this.dataService.descriptionField('name');
    this.dataService.requestOptions({ withCredentials: true });
  }

  ngOnInit() {
    this.filterStore.currentPage = '';
    this.filterStore.currentFilter = new OrderParams();
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
        Object.assign(this.report.fieldList, defaultScheduledFields);
        this.reportForm = this.report.CreateFormGroup();
        this.isLoading = false;
      } else {
        this.reportId = +params.get(this.queryParam);
        this.apiData.getCustomerGroup(this.reportId).pipe(takeUntil(this.unsubscribe$)).subscribe(
          apiResult => {
            this.report = apiResult;
            this.reportForm = this.report.CreateFormGroup();
            this.isLoading = false;
            if (this.report.fieldList.length === 0) {
              this.report.fieldList = [invoiceField];
            }
          }
        );
      }
    });
  }

  saveGroup() {
    this.report.SaveFormValues(this.reportForm);
    console.log(this.reportForm);
    console.log(this.report);
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
      }
    );
  }

  removeAccount(index: number) {
    this.groupAccounts.removeAt(index);
  }

  onDrop(event: CdkDragDrop<IFieldSettings[]>) {
    if ((!event.isPointerOverContainer || event.container.id === 'allFieldList') && event.previousContainer.id !== 'allFieldList') {
      event.previousContainer.data.splice(event.previousIndex, 1);
    } else {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        if (event.previousContainer.id === 'allFieldList' &&
          !event.container.data.some(item => item.desc === event.previousContainer.data[event.previousIndex].desc)) {
          copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
      }
    }
    if (this.report.fieldList.length === 0) {
      this.report.fieldList = [invoiceField];
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
    this.unsubscribeParams$.next();
    this.unsubscribeParams$.unsubscribe();
  }


}
