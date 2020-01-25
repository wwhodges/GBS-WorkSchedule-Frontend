import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IWorkParams,
         IOrder,
         Order,
         IOrderSummary,
         ICustomerGroup} from '../models/index';
import { IOrderList, OrderList } from '../models/orderList.model';
import { map } from 'rxjs/operators';
import { IUserSetting } from '../models/userSetting.model';


@Injectable()
export class ApiDataService {
  apiRoot = 'https://warehouseapidev.penguinrandomhouse.co.uk/api/GBSWorkSchedule/';

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

  saveCustomerGroup(group: ICustomerGroup) {
    if (group.id === 0) {
      const apiURL = `${this.apiRoot}CustomerGroup`;
      return this.http.post(apiURL, group, { withCredentials: true });
    } else {
      const apiURL = `${this.apiRoot}CustomerGroup/` + group.id;
      return this.http.put(apiURL, group, { withCredentials: true });
    }
  }

  deleteCustomerGroup(groupId: number) {
    const apiURL = `${this.apiRoot}CustomerGroup/` + groupId;
    return this.http.delete(apiURL, { withCredentials: true });
  }

  getOrderBySearch(term: string, workParams: IWorkParams) {
    if (term.length === 5 && parseInt(term, 10) > 0) { workParams.BATCH = term; } else
    if (term.length === 10 && parseInt(term, 10) > 0) { workParams.ACCOUNT = term; } else
    if (term.length === 8 && parseInt(term.substring(2, 4), 10) > 0) {workParams.INVOICE = term; } else {
      workParams.NAME = '%' + term + '%'; }
    const apiURL = `${this.apiRoot}Order`;
    return this.http.post<OrderList>(apiURL, workParams, { withCredentials: true }).pipe(
      map(response => new OrderList().deserialise(response))
    );
  }

  getOrderFilteredType(workParams: IWorkParams) {
    const apiURL = `${this.apiRoot}Order`;
    return this.http.post<OrderList>(apiURL, workParams, { withCredentials: true }).pipe(
      map(response => new OrderList().deserialise(response))
    );
  }

  getOrderById(id: string) {
    const apiURL = `${this.apiRoot}Order/` + id;
    return this.http.get<Order>(apiURL, { withCredentials: true }).pipe(
      map(response => new Order().deserialise(response))
    );
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
