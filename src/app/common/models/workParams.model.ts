export interface IWorkParams {
    INCLUDE_UNSCHEDULED: boolean;
    INCLUDE_SCHEDULED: boolean;

    INCLUDE_DESPATCHED: boolean;
    INCLUDE_UNSTARTED: boolean;
    INCLUDE_PARTPICKED: boolean;
    INCLUDE_PARTPACKED: boolean;
    INCLUDE_PARTDESPATCHED: boolean;

    DATE_RANGE: string;
    DATE_FROM: Date;
    DATE_TO: Date;

    MIN_WEIGHT: number;
    MAX_WEIGHT: number;

    SITE: string;
    WORKID: number;
    BATCH: string;
    ACCOUNT: string;
    INVOICE: string;
    NAME: string;
    GROUPID: number;

    SORT: number;

    PAGESIZE: number;
    PAGE: number;
}
