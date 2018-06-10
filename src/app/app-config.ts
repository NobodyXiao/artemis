import { InjectionToken } from '@angular/core';
import { IappConfig } from './iapp-config';

export const APP_DI_CONFIG: IappConfig = {
  apiEndpoint: 'https://api.echoface.cn/lens',
  apiAuth:'https://api.echoface.cn',
  apiArticleDetail:'https://api.echoface.cn/lens/p/article/detail',
  apiLensList:'https://api.echoface.cn/lens/lenslist',
  apiPublicLens: 'https://api.echoface.cn/lens/p/lenslist',
  apiWeather: 'https://api.echoface.cn/lens/p/tools/weather/query',
  apiUoloThings: 'https://api.echoface.cn/lens/things/v1/list/todo',
  apiAuthLogin: 'https://api.echoface.cn/au/login',
  apiAuthRegister: 'https://api.echoface.cn/au/signup',
  apiPublicThingsTodo:'https://api.echoface.cn/lens/p/things/v1/public/list'
};

export let APP_CONFIG = new InjectionToken('app.config');