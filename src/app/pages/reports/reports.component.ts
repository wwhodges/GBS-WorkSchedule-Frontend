import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { Observable } from 'rxjs';
import { CustomerGroup } from 'src/app/common/models';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public reports$: Observable<CustomerGroup[]>;

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.reports$ = this.apiData.getCustomerGroups('R', false);
  }

}
