export interface ICustomerGroup {
    id: number;
    groupName: string;
    minWeight: number;
    groupByAcct: boolean;
    destinationBase: number;
    prime: string;
    unscheduledOrder: number;
    members: string[];
}
