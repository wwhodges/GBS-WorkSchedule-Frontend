import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export interface IOrder {
    id: number;
    site: string;
    invoice: string;
    invRun: string;
    workType: string;
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
    manualOrder: boolean;
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
    brick: string;
}

export class Order implements IOrder {
    id = 0;
    site = 'G';
    invoice = 'MANORDER';
    invRun = 'MANUAL';
    workType = '';
    batch = '00000';
    doc = '000';
    account: string;
    invWeight = 0.000;
    units = 0;
    lines = 0;
    pickedQty = 0;
    pickedBulk = 0;
    pickedLoose = 0;
    vistaPicked = false;
    vistaPacked = false;
    destination = '';
    vistaStatus = 'Unstarted';
    dateDespatchedActual = null;
    dateInvoiced = new Date();
    scheduled = false;
    manualOrder = true;
    alp = '';
    bench = '';
    priority = '';
    picked = false;
    packed = false;
    holdLoc = '';
    palDest = '';
    palconPacked = 0;
    status = 'Unstarted';
    comments = '';
    workDate = new Date();
    delDate = new Date();
    despDate = new Date();
    palletIds = '';
    palletCount = 0;
    palletNumbers = '';
    name = '';
    prime = '';
    brick = '';

    public deserialise(input: any) {
        Object.assign(this, input);
        this.dateInvoiced = this.dateInvoiced === null ? null : new Date(this.dateInvoiced);
        this.workDate = this.workDate === null ? null : new Date(this.workDate);
        this.delDate = this.delDate === null ? null : new Date(this.delDate);
        this.despDate = this.despDate === null ? null : new Date(this.despDate);
        this.dateDespatchedActual = this.dateDespatchedActual === null ? null : new Date(this.dateDespatchedActual);
        if (this.destination === ' ') { this.destination = ''; }
        if (this.destination !== '' && this.palDest === '') { this.palDest = this.destination; }
        return this;
    }

    public CheckForChanges(form: FormGroup): boolean {
        if (form.controls.id.value !== this.id) { return true; }
        if (form.controls.site.value !== this.site) { return true; }
        if (form.controls.invoice.value !== this.invoice) { return true; }
        if (form.controls.invRun.value !== this.invRun) { return true; }
        if (form.controls.workType.value !== this.workType) { return true; }
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
        if (form.controls.dateDespatchedActual.value !== this.dateDespatchedActual) {
            return true; }
        if (form.controls.dateInvoiced.value !== this.dateInvoiced) {
            return true; }
        if (form.controls.scheduled.value !== this.scheduled) { return true; }
        if (form.controls.manualOrder.value !== this.manualOrder) { return true; }
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
        if (form.controls.workDate.value !== this.workDate) { return true; }
        if (form.controls.delDate.value !== this.delDate) { return true; }
        if (form.controls.despDate.value !== this.despDate) { return true; }
        if (form.controls.palletIds.value !== this.palletIds) { return true; }
        if (form.controls.palletCount.value !== this.palletCount) { return true; }
        if (form.controls.palletNumbers.value !== this.palletNumbers) { return true; }
        if (form.controls.name.value !== this.name) { return true; }
        return false;
    }

    public CreateFormGroup(dayOffset?: number, deliveryDays?: number): FormGroup {
        console.log(deliveryDays);
        if (dayOffset === undefined) { dayOffset = 0; }
        if (deliveryDays === undefined) { deliveryDays = 1; }
        if (!this.scheduled) {
            this.workDate.setDate(new Date().getDate() + dayOffset);
            this.despDate.setDate(new Date().getDate() + dayOffset);
            this.delDate.setDate(this.despDate.getDate() + deliveryDays);
        }

        const OrderForm = new FormGroup({
            id: new FormControl({ value: this.id, disabled: true}),
            site: new FormControl({value: this.site, disabled: !this.manualOrder}, [Validators.minLength(1), Validators.maxLength(1)]),
            invoice: new FormControl({ value: this.invoice, disabled: !this.manualOrder},
                [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
            invRun: new FormControl({ value: this.invRun, disabled: !this.manualOrder},
                [Validators.maxLength(10)]),
            workType: new FormControl({value: this.workType, disabled: !this.manualOrder},
                [Validators.maxLength(10)]),
            batch: new FormControl({value: this.batch, disabled: !this.manualOrder}, [Validators.minLength(5), Validators.maxLength(5)]),
            doc: new FormControl({value: this.doc, disabled: !this.manualOrder}, [Validators.minLength(3), Validators.maxLength(3)]),
            account: new FormControl({value: this.account, disabled: !this.manualOrder},
                [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            invWeight: new FormControl({value: this.invWeight, disabled: !this.manualOrder}, [Validators.pattern('^\\d+(\\.\\d{1,3})?$')]),
            units: new FormControl({value: this.units, disabled: !this.manualOrder}, [Validators.min(0), Validators.max(99999)]),
            lines: new FormControl({value: this.lines, disabled: !this.manualOrder}, [Validators.min(0), Validators.max(99999)]),
            pickedQty: new FormControl({value: this.pickedQty, disabled: !this.manualOrder}, [Validators.min(0), Validators.max(99999)]),
            pickedBulk: new FormControl({value: this.pickedBulk, disabled: !this.manualOrder}, [Validators.min(0), Validators.max(99999)]),
            pickedLoose: new FormControl({value: this.pickedLoose, disabled: !this.manualOrder},
                [Validators.min(0), Validators.max(99999)]),
            vistaPicked: new FormControl({value: this.vistaPicked, disabled: !this.manualOrder}),
            vistaPacked: new FormControl({value: this.vistaPacked, disabled: !this.manualOrder}),
            destination: new FormControl({value: this.destination, disabled: !this.manualOrder}, [Validators.maxLength(10)]),
            vistaStatus: new FormControl({value: this.vistaStatus, disabled: !this.manualOrder}),
            dateDespatchedActual: new FormControl(
                {value: this.dateDespatchedActual, disabled: !this.manualOrder}),
            dateInvoiced: new FormControl(
                {value: this.dateInvoiced, disabled: !this.manualOrder}),
            scheduled: new FormControl(this.scheduled),
            manualOrder: new FormControl({value: this.manualOrder, disabled: true}),
            alp: new FormControl(this.alp, [Validators.maxLength(3)]),
            bench: new FormControl(this.bench, [Validators.maxLength(3)]),
            priority: new FormControl(this.priority, [Validators.maxLength(50)]),
            picked: new FormControl(this.picked),
            packed: new FormControl(this.packed),
            holdLoc: new FormControl(this.holdLoc, [Validators.maxLength(80)]),
            palDest: new FormControl({value: this.palDest, disabled: this.destination !== ''}, [Validators.maxLength(10)]),
            palconPacked: new FormControl(this.palconPacked, [Validators.min(0), Validators.max(99999)]),
            status: new FormControl(this.status),
            comments: new FormControl(this.comments, [Validators.maxLength(255)]),
            workDate: new FormControl(this.workDate),
            delDate: new FormControl(this.delDate),
            despDate: new FormControl(this.despDate),
            palletIds: new FormControl(this.palletIds, [Validators.maxLength(100)]),
            palletCount: new FormControl(this.palletCount, [Validators.min(0), Validators.max(99999)]),
            palletNumbers: new FormControl(this.palletNumbers, [Validators.maxLength(255)]),
            name: new FormControl(this.name),
            prime: new FormControl({value: this.prime, disabled: true}),
            brick: new FormControl({value: this.brick, disabled: true})
        });
        return OrderForm;
    }

    public SaveFormValues(orderForm: FormGroup) {
        Object.assign(this, orderForm.value);
    }
}
