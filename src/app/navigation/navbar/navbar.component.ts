import { Component, OnInit } from '@angular/core';
import { ActiveUserService, IActiveUser } from 'src/app/common/activeUser.service';
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
  user$: Observable<IActiveUser>;

  menuData: INavbarData = {
    applicationName: 'Work Schedule',
    menuItems: [{menuName: 'Dashboard', menuLink: '/', menuActive: false, subMenu: []},
                {menuName: 'Unscheduled', menuLink: '/unscheduled', menuActive: false, subMenu: []},
                {menuName: 'Despatched', menuLink: '/despatched', menuActive: false, subMenu: []}],
    searchEnabled: true,
    searchPlaceholder: 'search'
  };


  constructor(private user: ActiveUserService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.user.getUser();
  }

  onSearched($event) {
    console.log($event);
    this.router.navigate(['/search', $event]);
  }

}
