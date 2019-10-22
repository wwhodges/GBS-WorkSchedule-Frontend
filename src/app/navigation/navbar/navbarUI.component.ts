import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-navbar-ui',
    templateUrl: 'navbarUI.component.html',
    styleUrls: ['navbarUI.component.scss']
})

export class NavbarUIComponent implements OnInit {

    @Input() navbarData: INavbarData;
    @Input() userName: string;
    @Input() userImageUrl: string;

    @Output() search = new EventEmitter<string>();

    public isCollapsed = true;

    searchForm = new FormGroup({
        searchTerm: new FormControl('')
    });

    constructor() {
    }

    ngOnInit() {
    }

    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
    }

    searchTriggered() {
        // console.log(this.searchForm.value.searchTerm);
        this.search.emit(this.searchForm.value.searchTerm);
    }

}

export interface INavbarMenuItem {
    menuName: string;
    menuLink: string;
    menuActive: boolean;
    subMenu: INavbarMenuItem [];
}
export interface INavbarData {
    applicationName: string;
    menuItems: INavbarMenuItem[];
    searchEnabled: boolean;
    searchPlaceholder: string;
}
