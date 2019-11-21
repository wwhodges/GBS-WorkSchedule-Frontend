import { IOrder } from './index';

export interface IOrderList {
    totalRecords: number;
    totalPages: number;
    orders: IOrder[];
}
