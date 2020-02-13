import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from 'src/app/common/services';
import { IActiveUser } from 'src/app/common/models';
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
                {menuName: 'Reports', menuLink: '/reports', menuActive: false, subMenu: []},
                {menuName: 'Create', menuLink: '/order/new', menuActive: false, subMenu: []}],
    searchEnabled: true,
    searchPlaceholder: 'search'
  };

  constructor(public user: ActiveUserService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.user.getUser();
  }

  onSearched($event) {
    console.log($event);
    this.router.navigate(['/search', $event]);
  }

}
