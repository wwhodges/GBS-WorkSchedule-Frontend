import { Injectable } from '@angular/core';
import { OrderParams } from '../models';

@Injectable()
export class OrderFilterStorage {
    public currentPage: string;    
    public currentFilter: OrderParams;
    public constructor() { }
}