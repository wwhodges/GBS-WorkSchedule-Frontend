import { Component, Input, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {
    @Input() currentPage: number;
    @Input() maxPages: number;
    @Output() pageSelected = new EventEmitter<number>();

    firstEnabled: boolean;
    lastEnabled: boolean;
    listPages: Array<null>;
    startPage: number;

    ngOnInit() {
    }

    ngOnChanges() {
        this.firstEnabled = this.currentPage !== 0;
        this.lastEnabled = this.currentPage < this.maxPages - 1;
        const pages = this.maxPages > 4 ? 5 : this.maxPages < 2 ? 1 : this.maxPages;
        this.listPages = new Array(pages);
        this.startPage = this.currentPage - 2 < 0 ? 1 :
            this.currentPage + 3 > this.maxPages ? this.maxPages - pages + 1 : this.currentPage - 1;
    }

    sendPage(page: number) {
        this.pageSelected.emit(page);
    }
}
