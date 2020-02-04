import { FormGroup, FormControl, FormControlName } from '@angular/forms';

export interface IOrderParams {
    vistaStatus: string; // Get vistaStatusField.options
    status: string; // Get statusField.options
    site: string; // Get siteField.options
    prime: string; // Get primeField.options

    // scheduled status filters
    includeUnscheduled: boolean;
    includeScheduled: boolean;

    // numeric filters
    weightMin: number;
    weightMax: number;

    // date filters
    workDateFrom: Date;
    workDateFromOffset: number;
    workDateTo: Date;
    workDateToOffset: number;
    despDateFrom: Date;
    despDateFromOffset: number;
    despDateTo: Date;
    despDateToOffset: number;
    delDateFrom: Date;
    delDateFromOffset: number;
    delDateTo: Date;
    delDateToOffset: number;
    actualDespDateFrom: Date;
    actualDespDateFromOffset: number;
    actualDespDateTo: Date;
    actualDespDateToOffset: number;
    invoiceDateFrom: Date;
    invoiceDateFromOffset: number;
    invoiceDateTo: Date;
    invoiceDateToOffset: number;

    // Get specific order
    workId: number;

    // Search fields
    batch: string;
    account: string;
    invoice: string;
    name: string;

    // Sorting
    sort: number;

    // Group account join - Not part of filter screen
    includeExcludeAccounts: number;
    matchAllBranches: boolean;
    groupId: number;

    // Paging - Not part of filter screen
    pageSize: number;
    page: number;
}

export class OrderParams implements IOrderParams {
    vistaStatus = '["Despatched","Part Despatched","Part Packed","Part Picked","Unstarted"]';
    // tslint:disable-next-line:max-line-length
    status = '["Despatched","Despatched 48Hr","In Progress","In Progress 48Hr","Unstarted","Unstarted 48Hr","Complete","Complete 48Hr","Prepared","Prepared 48Hr","Cancelled","Credit","Pulp","Collection","On Hold"]';
    site = '["G"]';
    prime = '["H","X"]';
    includeUnscheduled = true;
    includeScheduled = true;
    weightMin = null;
    weightMax = null;
    workDateFrom = null;
    workDateFromOffset = null;
    workDateTo = null;
    workDateToOffset = null;
    despDateFrom = null;
    despDateFromOffset = null;
    despDateTo = null;
    despDateToOffset = null;
    delDateFrom = null;
    delDateFromOffset = null;
    delDateTo = null;
    delDateToOffset = null;
    actualDespDateFrom = null;
    actualDespDateFromOffset = null;
    actualDespDateTo = null;
    actualDespDateToOffset = null;
    invoiceDateFrom = null;
    invoiceDateFromOffset = null;
    invoiceDateTo = null;
    invoiceDateToOffset = null;
    workId = null;
    batch = '';
    account = '';
    invoice = '';
    name = '';
    sort = 0;
    includeExcludeAccounts = 0;
    matchAllBranches = false;
    groupId = 0;
    pageSize = 50;
    page = 0;

    public deserialise(input: any) {
        Object.assign(this, input);
        return this;
    }

    public CreateFormGroup(): FormGroup {
        const ParameterForm = new FormGroup({
            vistaStatus: new FormControl(this.vistaStatus),
            status: new FormControl(this.status),
            prime: new FormControl(this.prime),
            site: new FormControl(this.site),
            includeScheduled: new FormControl(this.includeScheduled),
            includeUnscheduled: new FormControl(this.includeUnscheduled),
            workDateFrom: new FormControl(this.workDateFrom),
            workDateFromOffset: new FormControl(this.workDateFromOffset),
            workDateTo: new FormControl(this.workDateTo),
            workDateToOffset: new FormControl(this.workDateToOffset),
            despDateFrom: new FormControl(this.despDateFrom),
            despDateFromOffset: new FormControl(this.despDateFromOffset),
            despDateTo: new FormControl(this.despDateTo),
            despDateToOffset: new FormControl(this.despDateToOffset),
            delDateFrom: new FormControl(this.delDateFrom),
            delDateFromOffset: new FormControl(this.delDateFromOffset),
            delDateTo: new FormControl(this.delDateTo),
            delDateToOffset: new FormControl(this.delDateToOffset),
            invoiceDateFrom: new FormControl(this.invoiceDateFrom),
            invoiceDateFromOffset: new FormControl(this.invoiceDateFromOffset),
            invoiceDateTo: new FormControl(this.invoiceDateTo),
            invoiceDateToOffset: new FormControl(this.invoiceDateToOffset),
            actualDespDateFrom: new FormControl(this.actualDespDateFrom),
            actualDespDateFromOffset: new FormControl(this.actualDespDateFromOffset),
            actualDespDateTo: new FormControl(this.actualDespDateTo),
            actualDespDateToOffset: new FormControl(this.actualDespDateToOffset),
            weightMin: new FormControl(this.weightMin),
            weightMax: new FormControl(this.weightMax),
            workId: new FormControl(this.workId),
            batch: new FormControl(this.batch),
            account: new FormControl(this.account),
            invoice: new FormControl(this.invoice),
            name: new FormControl(this.name),
            sort: new FormControl(this.sort),
            includeExcludeAccounts: new FormControl(this.includeExcludeAccounts),
            matchAllBranches: new FormControl(this.matchAllBranches),
            groupId: new FormControl(this.groupId),
            pageSize: new FormControl(this.pageSize),
            page: new FormControl(this.page)
        });
        return ParameterForm;
    }

    public SaveFormValues(paramsForm: FormGroup) {
        Object.assign(this, paramsForm.value);
    }
}

export const sortOrderFields = [
    {description: 'default', value: 0},
    {description: 'Account Weight', value: 1},
    {description: 'Postcode Weight', value: 2},
    {description: 'id', value: 100},
    {description: 'site', value: 101},
    {description: 'invoice', value: 102},
    {description: 'batch', value: 103},
    {description: 'doc', value: 104},
    {description: 'account', value: 105},
    {description: 'invWeight', value: 106},
    {description: 'units', value: 107},
    {description: 'lines', value: 108},
    {description: 'pickedQty', value: 109},
    {description: 'pickedBulk', value: 110},
    {description: 'pickedLoose', value: 111},
    {description: 'vistaPicked', value: 112},
    {description: 'vistaPacked', value: 113},
    {description: 'destination', value: 114},
    {description: 'vistaStatus', value: 115},
    {description: 'dateDespatchedActual', value: 116},
    {description: 'dateInvoiced', value: 117},
    {description: 'scheduled', value: 118},
    {description: 'manualOrder', value: 119},
    {description: 'alp', value: 120},
    {description: 'bench', value: 121},
    {description: 'priority', value: 122},
    {description: 'picked', value: 123},
    {description: 'packed', value: 124},
    {description: 'holdLoc', value: 125},
    {description: 'palDest', value: 126},
    {description: 'palconPacked', value: 127},
    {description: 'status', value: 128},
    {description: 'comments', value: 129},
    {description: 'workDate', value: 130},
    {description: 'delDate', value: 131},
    {description: 'despDate', value: 132},
    {description: 'palletIds', value: 133},
    {description: 'palletCount', value: 134},
    {description: 'palletNumbers', value: 135},
    {description: 'name', value: 136},
    {description: 'prime', value: 137},
    {description: 'postCode', value: 138}
];
