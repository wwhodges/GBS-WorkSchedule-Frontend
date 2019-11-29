import { IFieldSettings } from './orderFields';

export interface IUserSetting {
    username: string;
    settingKey: string;
    settingData: string;
}

export interface IUserConfig {
    screenRows: number;
    unscheduledScreen: any; //IFieldSettings[];
    scheduledScreen: any; //IFieldSettings[];
}
