export interface IFieldSettings {
    name: string;
    edit: boolean;
    type: string;
    desc: string;
    size: string;
    style: string;
    options: string[];
}

export const defaultUnscheduledFields: IFieldSettings[] = [
    { name: 'site', edit: false, type: 'text', desc: 'Site', size: '1', style: '', options: [] },
    { name: 'invoice', edit: false, type: 'text', desc: 'Invoice', size: '8', style: '', options: [] },
    { name: 'batch', edit: false, type: 'text', desc: 'Batch', size: '5', style: '', options: [] },
    { name: 'doc', edit: false, type: 'text', desc: 'Doc', size: '3', style: '', options: [] },
    { name: 'account', edit: false, type: 'text', desc: 'Account', size: '10', style: '', options: [] },
    {
        name: 'vistaStatus', edit: true, type: 'text', desc: 'Status', size: '15', style: '', options: [
            'Despatched',
            'Despatched 48Hr',
            'In Progress',
            'In Progress 48Hr',
            'Unstarted',
            'Unstarted 48Hr',
            'Complete',
            'Complete 48Hr',
            'Prepared',
            'Prepared 48Hr',
            'Cancelled',
            'Credit',
            'Pulp',
            'Collection',
            'On Hold'
        ]
    },
    { name: 'dateInvoiced', edit: false, type: 'date', desc: 'Inv Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'name', edit: false, type: 'text', desc: 'Name', size: '34', style: '', options: [] },
    { name: 'invWeight', edit: false, type: 'text', desc: 'Weight', size: '8', style: '', options: [] },
    { name: 'units', edit: false, type: 'text', desc: 'Units', size: '6', style: '', options: [] },
    { name: 'lines', edit: false, type: 'text', desc: 'Lines', size: '4', style: '', options: [] },
    { name: 'palDest', edit: true, type: 'text', desc: 'Destination', size: '8', style: '', options: [] },
    { name: 'workDate', edit: true, type: 'date', desc: 'Work Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'delDate', edit: true, type: 'date', desc: 'Deliver Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'despDate', edit: true, type: 'date', desc: 'Despatch Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'scheduled', edit: false, type: 'checkbox', desc: 'Scheduled', size: '1', style: '', options: [] },
];

export const fieldSettings: IFieldSettings[] = [
    { name: 'invoice', edit: false, type: 'text', desc: 'Invoice', size: '8', style: '', options: [] },
    { name: 'batch', edit: false, type: 'text', desc: 'Batch', size: '5', style: '', options: [] },
    { name: 'account', edit: false, type: 'text', desc: 'Account', size: '10', style: '', options: [] },
    {
        name: 'vistaStatus', edit: true, type: 'text', desc: 'Status', size: '15', style: '', options: [
            'Despatched',
            'Despatched 48Hr',
            'In Progress',
            'In Progress 48Hr',
            'Unstarted',
            'Unstarted 48Hr',
            'Complete',
            'Complete 48Hr',
            'Prepared',
            'Prepared 48Hr',
            'Cancelled',
            'Credit',
            'Pulp',
            'Collection',
            'On Hold'
        ]
    },
    { name: 'dateInvoiced', edit: false, type: 'date', desc: 'Inv Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'name', edit: false, type: 'text', desc: 'Name', size: '34', style: '', options: [] },
    {
        name: 'status', edit: true, type: 'select', desc: 'Status', size: '15', style: '', options: [
            'Despatched',
            'Despatched 48Hr',
            'In Progress',
            'In Progress 48Hr',
            'Unstarted',
            'Unstarted 48Hr',
            'Complete',
            'Complete 48Hr',
            'Prepared',
            'Prepared 48Hr',
            'Cancelled',
            'Credit',
            'Pulp',
            'Collection',
            'On Hold'
        ]
    },
    { name: 'invWeight', edit: false, type: 'text', desc: 'Weight', size: '8', style: '', options: [] },
    { name: 'units', edit: false, type: 'text', desc: 'Units', size: '6', style: '', options: [] },
    { name: 'lines', edit: false, type: 'text', desc: 'Lines', size: '4', style: '', options: [] },
    { name: 'holdLoc', edit: true, type: 'text', desc: 'Holding', size: '10', style: '', options: [] },
    { name: 'palDest', edit: true, type: 'text', desc: 'Destination', size: '8', style: '', options: [] },
    { name: 'workDate', edit: true, type: 'date', desc: 'Work Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'delDate', edit: true, type: 'date', desc: 'Deliver Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'despDate', edit: true, type: 'date', desc: 'Despatch Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'pickedQty', edit: false, type: 'text', desc: 'Picked Qty', size: '8', style: '', options: [] },
    { name: 'pickedBulk', edit: false, type: 'text', desc: 'Picked Bulk', size: '8', style: '', options: [] },
    { name: 'pickedLoose', edit: false, type: 'text', desc: 'Picked Loose', size: '8', style: '', options: [] },
    { name: 'vistaPicked', edit: false, type: 'checkbox', desc: 'Picked (V)', size: '1', style: '', options: [] },
    { name: 'vistaPacked', edit: false, type: 'checkbox', desc: 'Packed (V)', size: '1', style: '', options: [] },
    { name: 'destination', edit: false, type: 'text', desc: 'Destination', size: '8', style: '', options: [] },
    { name: 'scheduled', edit: false, type: 'checkbox', desc: 'Scheduled', size: '1', style: '', options: [] },
    { name: 'alp', edit: false, type: 'text', desc: 'ALP', size: '5', style: '', options: [] },
    { name: 'bench', edit: false, type: 'text', desc: 'Bench', size: '5', style: '', options: [] },
    { name: 'priority', edit: false, type: 'text', desc: 'Priority', size: '3', style: '', options: [] },
    { name: 'picked', edit: false, type: 'checkbox', desc: 'Picked', size: '1', style: '', options: [] },
    { name: 'packed', edit: false, type: 'checkbox', desc: 'Packed', size: '1', style: '', options: [] },
    { name: 'palconPacked', edit: false, type: 'text', desc: 'Palcon Packed', size: '5', style: '', options: [] },
    { name: 'comments', edit: false, type: 'text', desc: 'Comments', size: '15', style: '', options: [] },
    { name: 'palletIds', edit: false, type: 'text', desc: 'Pallet Ids', size: '15', style: '', options: [] },
    { name: 'palletCount', edit: false, type: 'text', desc: 'Pallet Count', size: '6', style: '', options: [] },
    { name: 'palletNumbers', edit: false, type: 'text', desc: 'Pallet Nos', size: '10', style: '', options: [] },
    { name: 'prime', edit: false, type: 'text', desc: 'Prim', size: '1', style: '', options: [] },
];

export const defaultScheduledFields: IFieldSettings[] = [
    { name: 'invoice', edit: false, type: 'text', desc: 'Invoice', size: '8', style: '', options: [] },
    { name: 'batch', edit: false, type: 'text', desc: 'Batch', size: '5', style: '', options: [] },
    { name: 'account', edit: false, type: 'text', desc: 'Account', size: '10', style: '', options: [] },
    { name: 'dateInvoiced', edit: false, type: 'date', desc: 'Inv Date', size: '10', style: 'width: 130px;', options: [] },
    {
        name: 'status', edit: true, type: 'select', desc: 'Status', size: '15', style: '', options: [
            'Despatched',
            'Despatched 48Hr',
            'In Progress',
            'In Progress 48Hr',
            'Unstarted',
            'Unstarted 48Hr',
            'Complete',
            'Complete 48Hr',
            'Prepared',
            'Prepared 48Hr',
            'Cancelled',
            'Credit',
            'Pulp',
            'Collection',
            'On Hold'
        ]
    },
    { name: 'units', edit: false, type: 'text', desc: 'Units', size: '6', style: '', options: [] },
    { name: 'lines', edit: false, type: 'text', desc: 'Lines', size: '4', style: '', options: [] },
    { name: 'holdLoc', edit: true, type: 'text', desc: 'Holding', size: '10', style: '', options: [] },
    { name: 'palDest', edit: true, type: 'text', desc: 'Destination', size: '8', style: '', options: [] },
    { name: 'workDate', edit: true, type: 'date', desc: 'Work Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'delDate', edit: true, type: 'date', desc: 'Deliver Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'despDate', edit: true, type: 'date', desc: 'Despatch Date', size: '10', style: 'width: 130px;', options: [] },
    { name: 'scheduled', edit: false, type: 'checkbox', desc: 'Scheduled', size: '1', style: '', options: [] },
];
