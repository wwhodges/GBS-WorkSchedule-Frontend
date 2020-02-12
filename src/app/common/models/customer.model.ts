import { FormControl, FormGroup } from '@angular/forms';

export interface ICustomer {
    account: string;
    name: string;
    friendlyName: string;
    accountGroup: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    town: string;
    postCode: string;
    standardNo: string;
    custSta: string;
    prime: string;
    brick: string;
    currency: string;
    agency: string;
}

export class Customer implements ICustomer {
    account: string;    
    name: string;
    friendlyName: string;
    accountGroup: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    town: string;
    postCode: string;
    standardNo: string;
    custSta: string;
    prime: string;
    brick: string;
    currency: string;
    agency: string;

    public deserialise(input: any) {
        Object.assign(this, input);
        return this;
    }
    
    public CreateFormGroup(): FormGroup {
        const custForm = new FormGroup({
            account: new FormControl({value: this.account, disabled: true}),
            name: new FormControl({value: this.name, disabled: true}),
            friendlyName: new FormControl(this.friendlyName),
            accountGroup: new FormControl(this.accountGroup),
            address1: new FormControl({value: this.address1, disabled: true}),
            address2: new FormControl({value: this.address2, disabled: true}),
            address3: new FormControl({value: this.address3, disabled: true}),
            address4: new FormControl({value: this.address4, disabled: true}),
            town: new FormControl({value: this.town, disabled: true}),
            postCode: new FormControl({value: this.postCode, disabled: true}),
            standardNo: new FormControl({value: this.standardNo, disabled: true}),
            custSta: new FormControl({value: this.custSta, disabled: true}),
            prime: new FormControl({value: this.prime, disabled: true}),
            brick: new FormControl({value: this.brick, disabled: true}),
            currency: new FormControl({value: this.currency, disabled: true}),
            agency: new FormControl({value: this.agency, disabled: true})
        });
        return custForm;
    }
}