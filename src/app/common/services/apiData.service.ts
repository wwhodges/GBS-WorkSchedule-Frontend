import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  IOrder,
  Order,
  IOrderSummary,
  ICustomerGroup,
  CustomerGroup
} from '../models/index';
import { IOrderList, OrderList } from '../models/orderList.model';
import { map } from 'rxjs/operators';
import { IUserSetting } from '../models/userSetting.model';
import { IOrderParams, OrderParams } from '../models/orderParams.model';
import { ICustomer, Customer } from '../models/customer.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class ApiDataService {
  apiRoot = environment.apiEndpoint + 'GBSWorkSchedule/';

  constructor(private http: HttpClient) { }

  getCustomer(customerNumber: string) {
    const apiURL = `${this.apiRoot}Customer/` + customerNumber;
    return this.http.get<Customer>(apiURL, { withCredentials: true }).pipe(
      map(response => new Customer().deserialise(response))
    );
  }

  getOrderSummary(summaryType: string) {
    const apiURL = `${this.apiRoot}OrderSummary/` + summaryType;
    return this.http.get<IOrderSummary[]>(apiURL, { withCredentials: true });
  }

  getCustomerGroups(groupType: string, getStats: boolean) {
    const apiURL = `${this.apiRoot}CustomerGroup?groupType=` + groupType + `&getStats=` + getStats;
    return this.http.get<CustomerGroup[]>(apiURL, { withCredentials: true }).pipe(
      map(response => response.map(grp => new CustomerGroup().deserialise(grp)))
    );
  }

  getCustomerGroup(groupId: number) {
    const apiURL = `${this.apiRoot}CustomerGroup/` + groupId;
    return this.http.get<CustomerGroup>(apiURL, { withCredentials: true }).pipe(
      map(response => new CustomerGroup().deserialise(response))
    );
  }

  saveCustomerGroup(group: ICustomerGroup) {
    const serialGroup = {
      id: group.id,
      groupName: group.groupName,
      groupType: group.groupType,
      destinationBase: group.destinationBase,
      dayOffset: group.dayOffset,
      deliveryDays: group.deliveryDays,
      includeExcludeAccounts: group.includeExcludeAccounts,
      matchAllBranches: group.matchAllBranches,
      accounts: group.accounts,
      filterParams: JSON.stringify(group.filterParams),
      fieldList: JSON.stringify(group.fieldList)
    };

    if (group.id === 0) {
      const apiURL = `${this.apiRoot}CustomerGroup`;
      return this.http.post(apiURL, serialGroup, { withCredentials: true });
    } else {
      const apiURL = `${this.apiRoot}CustomerGroup/` + group.id;
      return this.http.put(apiURL, serialGroup, { withCredentials: true });
    }
  }

  deleteCustomerGroup(groupId: number) {
    const apiURL = `${this.apiRoot}CustomerGroup/` + groupId;
    return this.http.delete(apiURL, { withCredentials: true });
  }

  /*getOrderBySearch(term: string, workParams: IWorkParams) {
    if (term.length === 5 && parseInt(term, 10) > 0) { workParams.BATCH = term; } else
      if (term.length === 10 && parseInt(term, 10) > 0) { workParams.ACCOUNT = term; } else
        if (term.length === 8 && parseInt(term.substring(2, 4), 10) > 0) { workParams.INVOICE = term; } else {
          workParams.NAME = '%' + term + '%';
        }
    const apiURL = `${this.apiRoot}Order`;
    return this.http.post<OrderList>(apiURL, workParams, { withCredentials: true }).pipe(
      map(response => new OrderList().deserialise(response))
    );
  }*/

  getOrderFilteredType(workParams: OrderParams) {
    const apiURL = `${this.apiRoot}Order`;
    return this.http.post<OrderList>(apiURL, workParams, { withCredentials: true }).pipe(
      map(response => new OrderList().deserialise(response))
    );
  }

  getOrderExcelFilteredType(workParams: OrderParams) {
    const apiURL = `${this.apiRoot}OrderExcel`;
    return this.http.post(apiURL, workParams, { withCredentials: true, responseType: 'blob' as 'json' });
  }

  putOrderExcel(formData: FormData) {
    const ulheaders = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    ulheaders.append('Content-Type', 'multipart/form-data');
    ulheaders.append('Accept', 'application/json');
    const apiUrl = `${this.apiRoot}OrderExcel/Upload`;
    return this.http.post(apiUrl, formData, { withCredentials: true, headers: ulheaders });
  }

  getOrderById(id: string) {
    const apiURL = `${this.apiRoot}Order/` + id;
    return this.http.get<Order>(apiURL, { withCredentials: true }).pipe(
      map(response => new Order().deserialise(response))
    );
  }

  insertOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order`;
    return this.http.put<IOrder>(apiURL, order, { withCredentials: true });
  }

  updateOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order/` + order.id;
    return this.http.put<IOrder>(apiURL, order, { withCredentials: true });
  }

  deleteOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order/` + order.id;
    return this.http.delete<IOrder>(apiURL, { withCredentials: true });
  }

}
