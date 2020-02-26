export interface IFieldSettings {
    name: string;
    edit: boolean;
    type: string;
    desc: string;
    size: string;
    style: string;
    options: string[];
}

export const siteField = { name: 'site', edit: false, type: 'text', desc: 'Site', size: '1', style: '', options: ['G', 'T'] };
export const invoiceField = { name: 'invoice', edit: false, type: 'text', desc: 'Invoice', size: '8', style: '', options: [] };
export const invRunField = { name: 'invRun', edit: false, type: 'text', desc: 'Inv Run', size: '10', style: '', options: [] };
export const workTypeField = { name: 'workType', edit: false, type: 'text', desc: 'Work Type', size: '10', style: '', options: [] };
export const batchField = { name: 'batch', edit: false, type: 'text', desc: 'Batch', size: '5', style: '', options: [] };
export const docField = { name: 'doc', edit: false, type: 'text', desc: 'Doc', size: '3', style: '', options: [] };
export const accountField = { name: 'account', edit: false, type: 'text', desc: 'Account', size: '10', style: '', options: [] };
export const vistaStatusField = { name: 'vistaStatus', edit: false, type: 'select', desc: 'Status (V)', size: '15', style: '', options: [
            'Despatched',
            'Part Despatched',
            'Part Packed',
            'Part Picked',
            'Unstarted',
        ]
    };
export const dateDespatchedActualField = { name: 'dateDespatchedActual', edit: false, type: 'date', desc: 'Act Desp Date', size: '10', style: '', options: [] };
export const dateInvoicedField = { name: 'dateInvoiced', edit: false, type: 'date', desc: 'Inv Date', size: '10', style: '', options: [] };
export const nameField = { name: 'name', edit: false, type: 'text', desc: 'Name', size: '34', style: '', options: [] };
export const statusField = { name: 'status', edit: true, type: 'select', desc: 'Status', size: '15', style: '', options: [
            '',
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
    };
export const invWeightField = { name: 'invWeight', edit: false, type: 'text', desc: 'Weight', size: '8', style: '', options: [] };
export const unitsField = { name: 'units', edit: false, type: 'text', desc: 'Units', size: '6', style: '', options: [] };
export const linesField = { name: 'lines', edit: false, type: 'text', desc: 'Lines', size: '4', style: '', options: [] };
export const holdLocField = { name: 'holdLoc', edit: true, type: 'text', desc: 'Holding', size: '10', style: '', options: [] };
export const palDestField = { name: 'palDest', edit: true, type: 'text', desc: 'Destination', size: '8', style: '', options: [] };
export const workDateField = { name: 'workDate', edit: true, type: 'date', desc: 'Work Date', size: '10', style: '', options: [] };
export const delDateField = { name: 'delDate', edit: true, type: 'date', desc: 'Deliver Date', size: '10', style: '', options: [] };
export const despDateField = { name: 'despDate', edit: true, type: 'date', desc: 'Despatch Date', size: '10', style: '', options: [] };
export const pickedQtyField = { name: 'pickedQty', edit: false, type: 'text', desc: 'Picked Qty', size: '8', style: '', options: [] };
export const pickedBulkField = { name: 'pickedBulk', edit: false, type: 'text', desc: 'Picked Bulk', size: '8', style: '', options: [] };
export const pickedLooseField = { name: 'pickedLoose', edit: false, type: 'text', desc: 'Picked Loose', size: '8', style: '', options: [] };
export const vistaPickedField = { name: 'vistaPicked', edit: false, type: 'checkbox', desc: 'Picked (V)', size: '1', style: '', options: [] };
export const vistaPackedField = { name: 'vistaPacked', edit: false, type: 'checkbox', desc: 'Packed (V)', size: '1', style: '', options: [] };
export const destinationField = { name: 'destination', edit: false, type: 'text', desc: 'Destination', size: '8', style: '', options: [] };
export const scheduledField = { name: 'scheduled', edit: true, type: 'checkbox', desc: 'Scheduled', size: '1', style: '', options: [] };
export const alpField = { name: 'alp', edit: false, type: 'text', desc: 'ALP', size: '5', style: '', options: [] };
export const benchField = { name: 'bench', edit: false, type: 'text', desc: 'Bench', size: '5', style: '', options: [] };
export const priorityField = { name: 'priority', edit: false, type: 'text', desc: 'Priority', size: '3', style: '', options: [] };
export const pickedField = { name: 'picked', edit: false, type: 'checkbox', desc: 'Picked', size: '1', style: '', options: [] };
export const packedField = { name: 'packed', edit: false, type: 'checkbox', desc: 'Packed', size: '1', style: '', options: [] };
export const palconPackedField = { name: 'palconPacked', edit: false, type: 'text', desc: 'Palcon Packed', size: '5', style: '', options: [] };
export const commentsField = { name: 'comments', edit: false, type: 'text', desc: 'Comments', size: '60', style: '', options: [] };
export const palletIdsField = { name: 'palletIds', edit: false, type: 'text', desc: 'Pallet Ids', size: '15', style: '', options: [] };
export const palletCountField = { name: 'palletCount', edit: false, type: 'text', desc: 'Pallet Count', size: '6', style: '', options: [] };
export const palletNumbersField = { name: 'palletNumbers', edit: false, type: 'text', desc: 'Pallet Nos', size: '10', style: '', options: [] };
export const primeField = { name: 'prime', edit: false, type: 'text', desc: 'Prime', size: '1', style: '', options: ['H', 'X'] };


export const fieldSettings: IFieldSettings[] = [
    siteField,
    invoiceField,
    invRunField,
    workTypeField,
    batchField,
    docField,
    accountField,
    vistaStatusField,
    dateDespatchedActualField,
    dateInvoicedField,
    nameField,
    statusField,
    invWeightField,
    linesField,
    unitsField,
    holdLocField,
    palDestField,
    workDateField,
    despDateField,
    delDateField,
    pickedQtyField,
    pickedBulkField,
    pickedLooseField,
    vistaPackedField,
    vistaPickedField,
    destinationField,
    scheduledField,
    alpField,
    benchField,
    priorityField,
    pickedField,
    packedField,
    palconPackedField,
    commentsField,
    palletIdsField,
    palletCountField,
    palletNumbersField,
    primeField
];

export const defaultUnscheduledFields: IFieldSettings[] = [
    invoiceField, dateInvoicedField, batchField, workTypeField, accountField, nameField, vistaStatusField,
    invWeightField, palDestField, workDateField, delDateField, despDateField, scheduledField
];

export const defaultScheduledFields: IFieldSettings[] = [
    invoiceField, dateInvoicedField, accountField, nameField, statusField, holdLocField,
    palDestField, workDateField, delDateField, despDateField
];
