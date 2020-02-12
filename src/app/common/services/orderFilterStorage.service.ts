import { Injectable } from '@angular/core';

@Injectable()
export class OrderFilterStorage {
    public currentPage: string;    
    public currentFilter: string;
    public constructor() { }
}