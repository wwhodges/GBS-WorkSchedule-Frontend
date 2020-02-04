import { FormGroup, FormControl } from '@angular/forms';

export interface IWorkParams {
    INCLUDE_UNSCHEDULED: boolean;
    INCLUDE_SCHEDULED: boolean;

    INCLUDE_V_DESPATCHED: boolean;
    INCLUDE_V_UNSTARTED: boolean;
    INCLUDE_V_PARTPICKED: boolean;
    INCLUDE_V_PARTPACKED: boolean;
    INCLUDE_V_PARTDESPATCHED: boolean;

    INCLUDE_DESPATCHED: boolean;
    INCLUDE_INPROGRESS: boolean;
    INCLUDE_UNSTARTED: boolean;
    INCLUDE_COMPLETE: boolean;
    INCLUDE_PREPARED: boolean;
    INCLUDE_ONHOLD: boolean;
    INCLUDE_OTHER: boolean;

    DATE_RANGE: string;
    DATE_FROM: string;
    DATE_TO: string;

    MIN_WEIGHT: number;
    MAX_WEIGHT: number;

    SITE: string;
    WORKID: number;
    BATCH: string;
    ACCOUNT: string;
    INVOICE: string;
    NAME: string;
    GROUPID: number;
    PRIME: string;

    SORT: number;

    PAGESIZE: number;
    PAGE: number;
}

export class WorkParams implements IWorkParams {
    INCLUDE_SCHEDULED = true;
    INCLUDE_UNSCHEDULED = true;

    INCLUDE_V_DESPATCHED = true;
    INCLUDE_V_PARTDESPATCHED = true;
    INCLUDE_V_PARTPACKED = true;
    INCLUDE_V_PARTPICKED = true;
    INCLUDE_V_UNSTARTED = true;

    INCLUDE_DESPATCHED = true;
    INCLUDE_INPROGRESS = true;
    INCLUDE_UNSTARTED = true;
    INCLUDE_COMPLETE = true;
    INCLUDE_PREPARED = true;
    INCLUDE_ONHOLD = true;
    INCLUDE_OTHER = true;

    DATE_FROM = '';
    DATE_RANGE = '';
    DATE_TO = '';
    INVOICE = '';
    SITE = '';
    BATCH = '';
    ACCOUNT = '';
    NAME = '';
    GROUPID = 0;
    WORKID = 0;
    MIN_WEIGHT = 0;
    MAX_WEIGHT = 0;
    SORT = 0;
    PAGESIZE = 50;
    PAGE = 0;
    PRIME = '';

    public deserialise(input: any) {
        Object.assign(this, input);
        return this;
    }

    public CreateFormGroup(): FormGroup {
        const ParameterForm = new FormGroup({
            INCLUDE_UNSCHEDULED: new FormControl(this.INCLUDE_UNSCHEDULED),
            INCLUDE_SCHEDULED: new FormControl(this.INCLUDE_SCHEDULED),
            INCLUDE_V_DESPATCHED: new FormControl(this.INCLUDE_V_DESPATCHED),
            INCLUDE_V_UNSTARTED: new FormControl(this.INCLUDE_V_UNSTARTED),
            INCLUDE_V_PARTPICKED: new FormControl(this.INCLUDE_V_PARTPICKED),
            INCLUDE_V_PARTPACKED: new FormControl(this.INCLUDE_V_PARTPACKED),
            INCLUDE_V_PARTDESPATCHED: new FormControl(this.INCLUDE_V_PARTDESPATCHED),
            INCLUDE_DESPATCHED: new FormControl(this.INCLUDE_DESPATCHED),
            INCLUDE_INPROGRESS: new FormControl(this.INCLUDE_INPROGRESS),
            INCLUDE_UNSTARTED: new FormControl(this.INCLUDE_UNSTARTED),
            INCLUDE_COMPLETE: new FormControl(this.INCLUDE_COMPLETE),
            INCLUDE_PREPARED: new FormControl(this.INCLUDE_PREPARED),
            INCLUDE_ONHOLD: new FormControl(this.INCLUDE_ONHOLD),
            INCLUDE_OTHER: new FormControl(this.INCLUDE_OTHER),
            DATE_RANGE: new FormControl(this.DATE_RANGE),
            DATE_FROM: new FormControl(this.DATE_FROM),
            DATE_TO: new FormControl(this.DATE_TO),
            MIN_WEIGHT: new FormControl(this.MIN_WEIGHT),
            MAX_WEIGHT: new FormControl(this.MAX_WEIGHT),
            SITE: new FormControl(this.SITE),
            WORKID: new FormControl(this.WORKID),
            BATCH: new FormControl(this.BATCH),
            ACCOUNT: new FormControl(this.ACCOUNT),
            INVOICE: new FormControl(this.INVOICE),
            NAME: new FormControl(this.NAME),
            GROUPID: new FormControl(this.GROUPID),
            PRIME: new FormControl(this.PRIME),
            SORT: new FormControl(this.SORT),
            PAGESIZE: new FormControl(this.PAGESIZE),
            PAGE: new FormControl(this.PAGE)
        });
        return ParameterForm;
    }

    public SaveFormValues(paramsForm: FormGroup) {
        Object.assign(this, paramsForm.value);
    }
}

export const sortFields = [
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
    {description: 'ALP', value: 120},
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
