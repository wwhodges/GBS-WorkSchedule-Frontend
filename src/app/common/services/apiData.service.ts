import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IWorkParams,
         IOrder,
         IOrderSummary,
         ICustomerGroup} from '../models/index';


@Injectable()
export class ApiDataService {
  apiRoot = 'https://ukwwhdappdi001/api/GBSWorkSchedule/';

  constructor(private http: HttpClient) { }

  getOrderSummary(summaryType: string) {
    const apiURL = `${this.apiRoot}OrderSummary/` + summaryType;
    return this.http.get<IOrderSummary[]>(apiURL, { withCredentials: true });
  }

  getCustomerGroups() {
    const apiURL = `${this.apiRoot}CustomerGroup`;
    return this.http.get<ICustomerGroup[]>(apiURL, { withCredentials: true });
  }

  getCustomerGroup(groupId: number) {
    const apiURL = `${this.apiRoot}CustomerGroup/` + groupId;
    return this.http.get<ICustomerGroup>(apiURL, { withCredentials: true });
  }

  /*getWorkGroupUnscheduled() {
    const apiURL = `${this.apiRoot}ScheduledWork/Groups`;
    return this.http.get<IWorkScheduleGroupWork[]>(apiURL, { withCredentials: true });
  }*/

  getOrderBySearch(term: string, workParams: IWorkParams) {
    if (term.length === 5 && parseInt(term, 10) > 0) { workParams.BATCH = term; } else
    if (term.length === 10 && parseInt(term, 10) > 0) { workParams.ACCOUNT = term; } else
    if (term.length === 8 && parseInt(term.substring(1, 5), 10) > 0) {workParams.INVOICE = term; } else {
      workParams.NAME = '%' + term + '%'; }
    const apiURL = `${this.apiRoot}Order`;
    return this.http.post<IOrder[]>(apiURL, workParams, { withCredentials: true });
  }

  getOrderFiltered(workParams: IWorkParams) {
    const apiURL = `${this.apiRoot}Order`;
    return this.http.post<IOrder[]>(apiURL, workParams, { withCredentials: true });
  }

  getOrderById(id: string) {
    const apiURL = `${this.apiRoot}Order/` + id;
    return this.http.get<IOrder>(apiURL, { withCredentials: true });
  }

  insertOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order`;
    return this.http.put<IOrder>(apiURL, order, {withCredentials: true});
  }

  updateOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order/` + order.id;
    return this.http.put<IOrder>(apiURL, order, {withCredentials: true});
  }

}
