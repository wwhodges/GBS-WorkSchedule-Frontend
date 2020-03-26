import { IOrder, Order } from './index';
import { FormGroup, FormArray } from '@angular/forms';

export interface IOrderList {
    totalRecords: number;
    totalPages: number;
    orders: IOrder[];
    usedLocations: string[];
}

export class OrderList implements IOrderList {
    totalRecords: number;
    totalPages: number;
    orders: Order[];
    usedLocations: string[];

    public deserialise(input: any) {
        Object.assign(this, input);
        this.orders = input.orders.map(order => new Order().deserialise(order));
        return this;
    }

    public CreateFormGroup(dayOffset?: number, deliveryDays?: number): FormGroup {
        const ListForm = new FormArray([]);
        this.orders.map((order) => ListForm.push(order.CreateFormGroup(dayOffset, deliveryDays)));
        const OrderListForm = new FormGroup({
            orders: ListForm
        });
        return OrderListForm;
    }
}
