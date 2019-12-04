import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiDataService } from 'src/app/common/services';
import { Subject, Observable } from 'rxjs';
import { ICustomerGroup } from 'src/app/common/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups$: Observable<ICustomerGroup[]>;

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.groups$ = this.apiData.getCustomerGroups();
  }

}
