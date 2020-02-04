import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { OrderParams } from './orderParams.model';

export interface ICustomerGroup {
    id: number;
    groupName: string;
    groupType: string;
    destinationBase: number;
    dayOffset: number;
    unscheduledOrders: number;
    scheduledOrders: number;
    includeExcludeAccounts: number;
    matchAllBranches: boolean;
    accounts: string[];
    filterParams: OrderParams;
    fieldList: string[];
}

export class CustomerGroup implements ICustomerGroup {
    id = 0;
    groupName = 'New Group';
    groupType = 'C';
    destinationBase = 0;
    dayOffset = 0;
    unscheduledOrders = 0;
    scheduledOrders = 0;
    includeExcludeAccounts = 0;
    matchAllBranches = false;
    accounts = [];
    filterParams = new OrderParams();
    fieldList = [];

    public deserialise(input: any) {
        Object.assign(this, input);
        this.filterParams = new OrderParams();
        Object.assign(this.filterParams, JSON.parse(input.filterParams));
        Object.assign(this.fieldList, JSON.parse(input.fieldList));
        console.log(this);
        return this;
    }

    public CreateFormGroup(): FormGroup {
        const groupForm = new FormGroup({
            id: new FormControl(this.id),
            groupName: new FormControl(this.groupName),
            groupType: new FormControl(this.groupType),
            destinationBase: new FormControl(this.destinationBase),
            dayOffset: new FormControl(this.dayOffset),
            unscheduledOrders: new FormControl(this.unscheduledOrders),
            scheduledOrders: new FormControl(this.scheduledOrders),
            includeExcludeAccounts: new FormControl(this.includeExcludeAccounts),
            matchAllBranches: new FormControl(this.matchAllBranches),
            accounts: new FormArray(this.accounts),
            filterParams: this.filterParams.CreateFormGroup(),
            fieldList: new FormArray(this.fieldList)
        });
        return groupForm;
    }

    public SaveFormValues(groupForm: FormGroup) {
        Object.assign(this, groupForm.value);
    }

}
