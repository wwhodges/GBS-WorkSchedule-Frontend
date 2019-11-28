import { IOrder, Order } from './index';
import { FormGroup, FormArray } from '@angular/forms';

export interface IOrderList {
    totalRecords: number;
    totalPages: number;
    orders: IOrder[];
}

export class OrderList implements IOrderList {
    totalRecords: number;    totalPages: number;
    orders: Order[];

    public deserialise(input: any) {
        Object.assign(this, input);
        this.orders = input.orders.map(order => new Order().deserialise(order));
        return this;
    }

    public CreateFormGroup(): FormGroup {
        const ListForm = new FormArray([]);
        this.orders.map((order) => ListForm.push(order.CreateFormGroup()));
        const OrderListForm = new FormGroup({
            orders: ListForm
        });
        return OrderListForm;
    }
}
