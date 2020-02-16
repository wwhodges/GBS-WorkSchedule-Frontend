import { Component, OnInit } from '@angular/core';
import { ActiveUserService, ApiDataService } from 'src/app/common/services';
import { IActiveUser, CustomerGroup } from 'src/app/common/models';
import { Observable } from 'rxjs';
import { INavbarData } from './navbarUI.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
  <ng-container *ngIf="user$ | async as activeUser">
  <app-navbar-ui
      [navbarData]="menuData"
      [userName]="activeUser.forename + ' ' + activeUser.surname"
      [userImageUrl]="user.getUserImageLink()"
      (search)="onSearched($event)">
  </app-navbar-ui>
  <ng-container>
  `
})
export class NavbarComponent implements OnInit {
  public user$: Observable<IActiveUser>;

  menuData: INavbarData = {
    applicationName: 'Work Schedule',
    menuItems: [{menuName: 'Dashboard', menuLink: '/', menuActive: false, subMenu: []},
                {menuName: 'Unscheduled', menuLink: '/unscheduled', menuActive: false, subMenu: []},
                {menuName: 'Scheduled', menuLink: '/schedule', menuActive: false, subMenu: []},
                {menuName: 'Groups', menuLink: '/groups', menuActive: false, subMenu: []},
                {menuName: 'Create', menuLink: '/order/new', menuActive: false, subMenu: []}],
    searchEnabled: true,
    searchPlaceholder: 'search'
  };

  get menuItems() {
    return this.menuData.menuItems;
  }

  constructor(public user: ActiveUserService,
              private router: Router,
              private apiData: ApiDataService) {}

  ngOnInit() {
    this.user$ = this.user.getUser();
    this.apiData.getCustomerGroups('R',false).subscribe(reps => {
      const reportsMenu = {menuName: 'Reports', menuLink: '', menuActive: false, subMenu:
      reps.map( rep => {return {menuName: rep.groupName, menuLink: '/report/' + rep.id, menuActive: false, subMenu: []} } )};
      reportsMenu.subMenu.push({menuName: 'divider', menuLink: '', menuActive: false, subMenu: []});
      reportsMenu.subMenu.push({menuName: 'Maintenance', menuLink: '/reports', menuActive: false, subMenu: []});
      console.log(reportsMenu);
      this.menuItems.push(reportsMenu);
      console.log(this.menuData);
    });
  }

  onSearched($event) {
    console.log($event);
    this.router.navigate(['/search', $event]);
  }

}
