import { FormBuilder, FormGroup } from '@angular/forms';

export interface IOrder {
    id: number;
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
    vistaPicked: boolean;
    vistaPacked: boolean;
    destination: string;
    vistaStatus: string;
    dateDespatchedActual: Date;
    dateInvoiced: Date;
    scheduled: boolean;
    ALP: string;
    bench: string;
    priority: string;
    picked: boolean;
    packed: boolean;
    holdLoc: string;
    palDest: string;
    palconPacked: number;
    status: string;
    comments: string;
    workDate: Date;
    delDate: Date;
    despDate: Date;
    palletIds: string;
    palletCount: number;
    palletNumbers: string;
    name: string;
    prime: string;
}

