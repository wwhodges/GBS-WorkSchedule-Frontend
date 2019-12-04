import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    alp: string;
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

export class Order implements IOrder {
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
    dateDespatchedActual: Date = new Date();
    dateInvoiced: Date = new Date();
    scheduled: boolean;
    alp: string;
    bench: string;
    priority: string;
    picked: boolean;
    packed: boolean;
    holdLoc: string;
    palDest: string;
    palconPacked: number;
    status: string;
    comments: string;
    workDate: Date = new Date();
    delDate: Date = new Date();
    despDate: Date = new Date();
    palletIds: string;
    palletCount: number;
    palletNumbers: string;
    name: string;
    prime: string;

    public deserialise(input: any) {
        Object.assign(this, input);
        return this;
    }

    public CheckForChanges(form: FormGroup): boolean {
        if (form.controls.id.value !== this.id) { return true; }
        if (form.controls.site.value !== this.site) { return true; }
        if (form.controls.invoice.value !== this.invoice) { return true; }
        if (form.controls.batch.value !== this.batch) { return true; }
        if (form.controls.doc.value !== this.doc) { return true; }
        if (form.controls.account.value !== this.account) { return true; }
        if (form.controls.invWeight.value !== this.invWeight) { return true; }
        if (form.controls.units.value !== this.units) { return true; }
        if (form.controls.lines.value !== this.lines) { return true; }
        if (form.controls.pickedQty.value !== this.pickedQty) { return true; }
        if (form.controls.pickedBulk.value !== this.pickedBulk) { return true; }
        if (form.controls.pickedLoose.value !== this.pickedLoose) { return true; }
        if (form.controls.vistaPicked.value !== this.vistaPicked) { return true; }
        if (form.controls.vistaPacked.value !== this.vistaPacked) { return true; }
        if (form.controls.destination.value !== this.destination) { return true; }
        if (form.controls.vistaStatus.value !== this.vistaStatus) { return true; }
        if (form.controls.dateDespatchedActual.value !== new Date(this.dateDespatchedActual).toISOString().substring(0, 10)) {
            return true; }
        if (form.controls.dateInvoiced.value !== new Date(this.dateInvoiced).toISOString().substring(0, 10)) {
            return true; }
        if (form.controls.scheduled.value !== this.scheduled) { return true; }
        if (form.controls.alp.value !== this.alp) { return true; }
        if (form.controls.bench.value !== this.bench) { return true; }
        if (form.controls.priority.value !== this.priority) { return true; }
        if (form.controls.picked.value !== this.picked) { return true; }
        if (form.controls.packed.value !== this.packed) { return true; }
        if (form.controls.holdLoc.value !== this.holdLoc) { return true; }
        if (form.controls.palDest.value !== this.palDest) { return true; }
        if (form.controls.palconPacked.value !== this.palconPacked) { return true; }
        if (form.controls.status.value !== this.status) { return true; }
        if (form.controls.comments.value !== this.comments) { return true; }
        if (form.controls.workDate.value !== new Date(this.workDate).toISOString().substring(0, 10)) { return true; }
        if (form.controls.delDate.value !== new Date(this.delDate).toISOString().substring(0, 10)) { return true; }
        if (form.controls.despDate.value !== new Date(this.despDate).toISOString().substring(0, 10)) { return true; }
        if (form.controls.palletIds.value !== this.palletIds) { return true; }
        if (form.controls.palletCount.value !== this.palletCount) { return true; }
        if (form.controls.palletNumbers.value !== this.palletNumbers) { return true; }
        return false;
    }

    public CreateFormGroup(): FormGroup {
        const OrderForm = new FormGroup({
            id: new FormControl(this.id),
            site: new FormControl(this.site),
            invoice: new FormControl(this.invoice),
            batch: new FormControl(this.batch),
            doc: new FormControl(this.doc),
            account: new FormControl(this.account),
            invWeight: new FormControl(this.invWeight),
            units: new FormControl(this.units),
            lines: new FormControl(this.lines),
            pickedQty: new FormControl(this.pickedQty),
            pickedBulk: new FormControl(this.pickedBulk),
            pickedLoose: new FormControl(this.pickedLoose),
            vistaPicked: new FormControl(this.vistaPicked),
            vistaPacked: new FormControl(this.vistaPacked),
            destination: new FormControl(this.destination),
            vistaStatus: new FormControl(this.vistaStatus),
            dateDespatchedActual: new FormControl(new Date(this.dateDespatchedActual).toISOString().substring(0, 10)),
            dateInvoiced: new FormControl(new Date(this.dateInvoiced).toISOString().substring(0, 10)),
            scheduled: new FormControl(this.scheduled),
            alp: new FormControl(this.alp),
            bench: new FormControl(this.bench),
            priority: new FormControl(this.priority),
            picked: new FormControl(this.picked),
            packed: new FormControl(this.packed),
            holdLoc: new FormControl(this.holdLoc),
            palDest: new FormControl(this.palDest),
            palconPacked: new FormControl(this.palconPacked),
            status: new FormControl(this.status),
            comments: new FormControl(this.comments),
            workDate: new FormControl(new Date(this.workDate).toISOString().substring(0, 10)),
            delDate: new FormControl(new Date(this.delDate).toISOString().substring(0, 10)),
            despDate: new FormControl(new Date(this.despDate).toISOString().substring(0, 10)),
            palletIds: new FormControl(this.palletIds),
            palletCount: new FormControl(this.palletCount),
            palletNumbers: new FormControl(this.palletNumbers),
            name: new FormControl(this.name),
            prime: new FormControl(this.prime)
        });
        return OrderForm;
    }

    public SaveFormValues(orderForm: FormGroup) {
        Object.assign(this, orderForm.value);
    }
}
