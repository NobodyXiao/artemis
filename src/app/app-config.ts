import { InjectionToken } from '@angular/core';
import { IappConfig } from './iapp-config';

export const APP_DI_CONFIG: IappConfig = {
  apiEndpoint: 'https://api.echoface.cn',
};

export let APP_CONFIG = new InjectionToken('app.config');