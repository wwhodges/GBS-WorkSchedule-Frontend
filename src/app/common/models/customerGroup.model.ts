export interface ICustomerGroup {
    id: number;
    groupName: string;
    minWeight: number;
    groupByAcct: boolean;
    destinationBase: number;
    unscheduledOrder: number;
    members: string[];
}
