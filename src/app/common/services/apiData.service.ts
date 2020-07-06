import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  IOrder,
  Order,
  IOrderSummary,
  ICustomerGroup,
  CustomerGroup
} from '../models/index';
import { OrderList } from '../models/orderList.model';
import { map } from 'rxjs/operators';
import { OrderParams } from '../models/orderParams.model';
import { Customer } from '../models/customer.model';
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
    const newParams = new OrderParams();
    Object.assign(newParams, workParams);
    newParams.invoiceDateFrom = convertDate(newParams.invoiceDateFrom);
    newParams.invoiceDateTo = convertDate(newParams.invoiceDateTo);
    newParams.workDateFrom = convertDate(newParams.workDateFrom);
    newParams.workDateTo = convertDate(newParams.workDateTo);
    newParams.despDateFrom = convertDate(newParams.despDateFrom);
    newParams.despDateTo = convertDate(newParams.despDateTo);
    newParams.delDateFrom = convertDate(newParams.delDateFrom);
    newParams.delDateTo = convertDate(newParams.delDateTo);
    newParams.actualDespDateFrom = convertDate(newParams.actualDespDateFrom);
    newParams.actualDespDateTo = convertDate(newParams.actualDespDateTo);

    return this.http.post<OrderList>(apiURL, newParams, { withCredentials: true }).pipe(
      map(response => new OrderList().deserialise(response))
    );
  }

  getOrderUsedDestinations() {
    const apiURL = `${this.apiRoot}Order/Used`;
    return this.http.get<OrderList>(apiURL, { withCredentials: true }).pipe(
      map(response => new OrderList().deserialise(response))
    );
  }

  getOrderExcelFilteredType(workParams: OrderParams) {
    const apiURL = `${this.apiRoot}OrderExcel`;
    const newParams = new OrderParams();
    Object.assign(newParams, workParams);
    newParams.invoiceDateFrom = convertDate(setFromToTime(newParams.invoiceDateFrom, 'from'));
    newParams.invoiceDateTo = convertDate(setFromToTime(newParams.invoiceDateTo, 'to'));
    newParams.workDateFrom = convertDate(setFromToTime(newParams.workDateFrom, 'from'));
    newParams.workDateTo = convertDate(setFromToTime(newParams.workDateTo, 'to'));
    newParams.despDateFrom = convertDate(setFromToTime(newParams.despDateFrom, 'from'));
    newParams.despDateTo = convertDate(setFromToTime(newParams.despDateTo, 'to'));
    newParams.delDateFrom = convertDate(setFromToTime(newParams.delDateFrom, 'from'));
    newParams.delDateTo = convertDate(setFromToTime(newParams.delDateTo, 'to'));
    newParams.actualDespDateFrom = convertDate(setFromToTime(newParams.actualDespDateFrom, 'from'));
    newParams.actualDespDateTo = convertDate(setFromToTime(newParams.actualDespDateTo, 'to'));
    return this.http.post(apiURL, newParams, { withCredentials: true, responseType: 'blob' as 'json' });
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
    const newOrder = new Order();
    Object.assign(newOrder, order);
    newOrder.dateInvoiced = convertDate(order.dateInvoiced);
    newOrder.delDate = convertDate(order.delDate);
    newOrder.despDate = convertDate(order.despDate);
    newOrder.workDate = convertDate(order.workDate);
    newOrder.dateDespatchedActual = convertDate(order.dateDespatchedActual);
    return this.http.put<IOrder>(apiURL, newOrder, { withCredentials: true });
  }

  updateOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order/` + order.id;
    const newOrder = new Order();
    Object.assign(newOrder, order);
    newOrder.dateInvoiced = convertDate(order.dateInvoiced);
    newOrder.delDate = convertDate(order.delDate);
    newOrder.despDate = convertDate(order.despDate);
    newOrder.workDate = convertDate(order.workDate);
    newOrder.dateDespatchedActual = convertDate(order.dateDespatchedActual);
    return this.http.put<IOrder>(apiURL, newOrder, { withCredentials: true });
  }

  deleteOrder(order: IOrder) {
    const apiURL = `${this.apiRoot}Order/` + order.id;
    return this.http.delete<IOrder>(apiURL, { withCredentials: true });
  }

}

function convertDate(myDate: Date): Date {
  // When Angular sends the date as JSON it convert to UTC taking the timezone into account
  // this compensates for that so the correct date is saved instead of taking an hour off during BST
  const newDate = myDate === null ? null : new Date(myDate.getTime() - ( myDate.getTimezoneOffset() * 60 * 1000));
  return newDate;
}

function setFromToTime(inputDate: Date, fromTo: string) {
  // John S - PRHUKWD-151 / INC0274891
  // bsDatePicker can include the current time as part of the date object in certain situations, which can
  // cause 0 rows to be returned if running a query for a single date.  This function sets the start/end
  // of day times for from/to dates to avoid this.
  if (inputDate == null) { return null; }
  if (fromTo === 'from') { inputDate.setHours(0, 0, 0); }
  if (fromTo === 'to') { inputDate.setHours(23, 59, 59); }
  return inputDate;
}
