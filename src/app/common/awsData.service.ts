import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IWorkParams } from './models/workParams.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class AwsDataService {
  apiRoot = 'https://ukwwhdappdi001/api/';

  constructor(private http: HttpClient) { }

  getCASStats() {
    const apiURL = `${this.apiRoot}stats/cas`;
    return this.http.get<IAWSStatsCAS[]>(apiURL, { withCredentials: true });
  }
  getFBSStats() {
    const apiURL = `${this.apiRoot}stats/fbs`;
    return this.http.get<IAWSStatsFBS[]>(apiURL, { withCredentials: true });
  }

  getPalconWork() {
    const apiURL = `${this.apiRoot}palcon`;
    return this.http.get<IAWSPalconWork[]>(apiURL, { withCredentials: true });
  }

  getGBSData() {
    const apiURL = `${this.apiRoot}gbs`;
    return this.http.get<IGBSData>(apiURL, { withCredentials: true });
  }

  getWorkScheduleUnscheduled() {
    const apiURL = `${this.apiRoot}GBSScheduledWork/Unscheduled`;
    return this.http.get<WorkScheduledWork[]>(apiURL, { withCredentials: true });
  }

  getWorkScheduleSummary(byDate: string) {
    byDate === 'release' ? byDate = 'release' : byDate = 'despatch';
    const apiURL = `${this.apiRoot}GBSWorkSummary/` + byDate;
    return this.http.get<WorkDateSummary[]>(apiURL, { withCredentials: true });
  }

  getWorkStatusSummary() {
    const apiURL = `${this.apiRoot}GBSWorkSummary/Status`;
    return this.http.get<WorkStatusSummary[]>(apiURL, { withCredentials: true });
  }

  getWorkGroupUnscheduled() {
    const apiURL = `${this.apiRoot}GBSScheduledWork/Groups`;
    return this.http.get<WorkScheduleGroupWork[]>(apiURL, { withCredentials: true });
  }

  getWorkBySearch(term: string, workParams: IWorkParams) {
    const apiURL = `${this.apiRoot}GBSScheduledWork/Search/` + term;
    return this.http.post<WorkScheduledWork[]>(apiURL, workParams, { withCredentials: true });
  }

  getWorkById(id: string) {
    const apiURL = `${this.apiRoot}GBSScheduledWork/` + id;
    return this.http.get<WorkScheduledWork>(apiURL, { withCredentials: true });
  }

  addToSchedule(work: WorkScheduleData) {
    const apiURL = `${this.apiRoot}GBSScheduledWork/Groups`;
    this.http.post<WorkScheduleData>(apiURL, work, {withCredentials: true});
  }

}

export interface WorkScheduleData {
  workId: number;
  destination: string;
}

export interface WorkStatusSummary {
  site: string;
  status: string;
  invoices: number;
  lines: number;
  unit: number;
}

export interface WorkDateSummary {
  date: Date;
  invoices: number;
  lines: number;
  units: number;
}

export interface WorkScheduleGroupWork {
  group: WorkScheduleGroup;
  work: WorkScheduledWork[];
}

export interface WorkScheduleGroup {
  id: number;
  groupName: string;
  minWeight: number;
  groupByAcct: boolean;
  destinationBase: number;
}

export interface WorkScheduledWork {
  workId: number;
  site: string;
  invoice: string;
  batch: string;
  doc: string;
  account: string;
  invWeight: number;
  units: number;
  lines: number;
  pickedQty: number;
  pickedBulk: number;
  pickedLoose: number;
  picked: boolean;
  packed: boolean;
  destination: string;
  status: string;
  dateDespatchedActual: Date;
  dateInvoiced: Date;
  scheduleId: number;
  ALP: string;
  bench: string;
  priority: string;
  schedulePicked: boolean;
  schedulePacked: boolean;
  holdLoc: string;
  palconPacked: number;
  scheduleStatus: string;
  comments: string;
  workDate: Date;
  delDate: Date;
  despDate: Date;
  palletIds: string;
  palletCount: number;
  palletNumbers: string;
  name: string;
  editForm: FormGroup;
}

export interface IAWSStatsCAS {
  date: Date;
  operator: {
      code: string;
      description: string;
  };
  packs: {
      picked: number;
      confirmed: number;
      palleted: number;
      credited: number;
  };
  cartons: {
      confirmed: number;
      palleted: number;
  };
  palletsClosed: number;
}

export interface IAWSStatsFBS {
  date: string;
  operator: {
    code: string;
    description: string;
  };
  cartonsStarted: number;
  linesStarted: number;
  cartonsPacked: number;
  linesPacked: number;
  cartonsCredited: number;
  linesCredited: number;
  failedLines: number;
  repickedLines: number;
  pickedBooks: number;
}

export interface IAWSPalconWork {
  docRef: string;
  market: string;
  zone: string;
  customer: {
    name: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    postCode: string;
  };
  shipper: {
    name: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    postCode: string;
  };
  deliveryTown: string;
  releaseFilename: string;
  grossWeight: number;
  bulkPacks: number;
  bulkPacksPalleted: number;
  forwardPacks: number;
  forwardPacksPalleted: number;
  forwardParcels: number;
  forwardParcelsPalleted: number;
  palletsEstimated: number;
  palletsOpen: number;
  palletsCompleted: number;
  workDate: Date;
  workedBy: {
    code: string;
    description: string;
  };
  notes: string;
}

export interface IGBSOrder {
  site: string;
  customer: string;
  docRef: string;
  startDate: Date;
  endDate: Date;
  parcelsDespatched: number;
  parcelsPacked: number;
  noOfParcels: number;
  deliveredWeight: number;
  deliveredQty: number;
  satisfiedQty: number;
  destArea: string;
  palconBulkPicked: number;
  palconLoosePicked: number;
  status: string;
}

export interface IGBSDespData {
  date: Date;
  ordersDespatched: number;
  parcelsDespatched: number;
}

export interface IGBSData {
  orders: IGBSOrder[];
  currentStats: {
    ordersDespatched: number;
    ordersOnHold: number;
    ordersDespatching: number;
    ordersPacking: number;
    ordersPicking: number;
    ordersAwaiting: number;
    parcelsDespatched: number;
    parcelsOnHold: number;
    parcelsDespatching: number;
    parcelsPacking: number;
    parcelsPicking: number;
    parcelsAwaiting: number;
  };
  despHistory: IGBSDespData[];
}
