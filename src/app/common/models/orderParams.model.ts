import { FormGroup, FormControl, FormControlName } from '@angular/forms';

export interface IOrderParams {
    filterVistaStatus: string; // Get vistaStatusField.options
    filterStatus: string; // Get statusField.options
    filterSite: string; // Get siteField.options
    filterPrime: string; // Get primeField.options
    filterWorkType: string; // Get workTypeField.options

    // scheduled status filters
    includeUnscheduled: boolean;
    includeScheduled: boolean;

    // numeric filters
    weightMin: number;
    weightMax: number;
    unitsMin: number;
    unitsMax: number;
    linesMin: number;
    linesMax: number;
    palconPackedMin: number;
    palconPackedMax: number;

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
    filterWorkId: number;

    // Search fields
    filterBatch: string;
    filterAccount: string;
    filterInvoice: string;
    filterName: string;
    filterInvRun: string;
    filterPalDest: string;
    filterHoldLoc: string;
    filterComments: string;
    filterBrick: string;

    // Sorting
    sortString: string;
    sortDir: string; // ASC or DESC
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
    filterVistaStatus = '["Despatched","Part Despatched","Part Packed","Part Picked","Unstarted"]';
    // tslint:disable-next-line:max-line-length
    filterStatus = '["","Despatched","Despatched 48Hr","In Progress","In Progress 48Hr","Unstarted","Unstarted 48Hr","Complete","Complete 48Hr","Prepared","Prepared 48Hr","Cancelled","Credit","Pulp","Collection","On Hold","Pending"]';
    filterSite = '["G"]';
    filterPrime = '["H","X"]';
    // tslint:disable-next-line:max-line-length
    filterWorkType = '["", "Answers","Cash Sale","Chge Only","Cycl 24H","Cycle 24H","D2C 24hr","Drop Ship","Dues Rel","Dues rel","LP 24","PH 24","Planned","Prio Y","PriorityR","Proformas","Red HLine","Rev Dues","Samples","Spec Rel","Spec Rel2","Spec Rel3","Specials","Specific","Specific2","Stock","WHS Ret","WHS Trav"]';
    includeUnscheduled = true;
    includeScheduled = true;
    weightMin = null;
    weightMax = null;
    unitsMin = null;
    unitsMax = null;
    linesMin = null;
    linesMax = null;
    palconPackedMin = null;
    palconPackedMax = null;
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
    invoiceDateFromOffset = -60;
    invoiceDateTo = null;
    invoiceDateToOffset = null;
    filterWorkId = null;
    filterBatch = '';
    filterAccount = '';
    filterInvoice = '';
    filterName = '';
    filterInvRun = '';
    filterPalDest = '';
    filterHoldLoc = '';
    filterComments = '';
    filterBrick = '';
    sortString = 'default';
    sortDir = 'ASC';
    sort = 0;
    includeExcludeAccounts = 0;
    matchAllBranches = false;
    groupId = 0;
    pageSize = 50;
    page = 0;

    public deserialise(input: any) {
        Object.assign(this, input);
        this.workDateFrom = input.workDateFrom === null ? null : new Date(input.workDateFrom);
        this.workDateTo = input.workDateTo === null ? null : new Date(input.workDateTo);
        this.despDateFrom = input.despDateFrom === null ? null : new Date(input.despDateFrom);
        this.despDateTo = input.despDateTo === null ? null : new Date(input.despDateTo);
        this.delDateFrom = input.delDateFrom === null ? null : new Date(input.delDateFrom);
        this.delDateTo = input.delDateTo === null ? null : new Date(input.delDateTo);
        this.actualDespDateFrom = input.actualDespDateFrom === null ? null : new Date(input.actualDespDateFrom);
        this.actualDespDateTo = input.actualDespDateTo === null ? null : new Date(input.actualDespDateTo);
        this.invoiceDateFrom = input.invoiceDateFrom === null ? null : new Date(input.invoiceDateFrom);
        this.invoiceDateTo = input.invoiceDateTo === null ? null : new Date(input.invoiceDateTo);
        return this;
    }

    public CreateFormGroup(): FormGroup {
        const ParameterForm = new FormGroup({
            filterVistaStatus: new FormControl(this.filterVistaStatus),
            filterStatus: new FormControl(this.filterStatus),
            filterPrime: new FormControl(this.filterPrime),
            filterSite: new FormControl(this.filterSite),
            filterWorkType: new FormControl(this.filterWorkType),
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
            unitsMin: new FormControl(this.unitsMin),
            unitsMax: new FormControl(this.unitsMax),
            linesMin: new FormControl(this.linesMin),
            linesMax: new FormControl(this.linesMax),
            palconPackedMin: new FormControl(this.palconPackedMin),
            palconPackedMax: new FormControl(this.palconPackedMax),
            filterWorkId: new FormControl(this.filterWorkId),
            filterBatch: new FormControl(this.filterBatch),
            filterAccount: new FormControl(this.filterAccount),
            filterInvoice: new FormControl(this.filterInvoice),
            filterName: new FormControl(this.filterName),
            filterInvRun: new FormControl(this.filterInvRun),
            filterPalDest: new FormControl(this.filterPalDest),
            filterHoldLoc: new FormControl(this.filterHoldLoc),
            filterComments: new FormControl(this.filterComments),
            filterBrick: new FormControl(this.filterBrick),
            sortString: new FormControl(this.sortString),
            sortDir: new FormControl(this.sortDir),
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
    {description: 'postCode', value: 138},
    {description: 'invRun', value: 139},
    {description: 'workType', value: 140},
    {description: 'brick', value: 141}
];
