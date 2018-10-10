import { Inject, Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response, ResponseOptions } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
// import { GetTokenService } from './get-token.service';


import { Router } from '@angular/router';
import { APP_CONFIG } from '../../app/app-config';
import { IappConfig } from '../../app/iapp-config';
import { Account } from '../models/account';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Subject } from "rxjs/Subject";
import {HttpClient} from "@angular/common/http"

@Injectable()
export class AppNavigationService {

	response: Response = new Response(new ResponseOptions({body: '{"success":false, "unauthorized":true}'}));
  header: Headers  = new Headers({'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8'});

  constructor(
    private _http: Http,
    private _httpClient: HttpClient,
		@Inject(APP_CONFIG) private _appconfig: IappConfig, 
		private _authHttp: AuthHttp,
    private _router: Router
  ) {}
  // 跳转至详情页
  turnDetailPage(): Observable<any> {
    let requestUrl = this._appconfig.apiArticleDetail;
    let searchParams = new URLSearchParams();
    let type = localStorage.getItem('detailType');
    let rpath = localStorage.getItem('detailPath');
    let articelId = localStorage.getItem('articleId');

    searchParams.set('type', type || "md");
    searchParams.set('path', rpath || '');
    searchParams.set('uuid', articelId || '');
    return this._authHttp.post(requestUrl, searchParams.toString(), { 
      headers: this.header,
      withCredentials: true,
     });
  }
  // 跳转到首页，向服务器进行列表页关于用户的信息请求
  toGetUserHomeList(): Observable<any> {
    if (tokenNotExpired('jwt')) {
      let requestUrl = this._appconfig.apiLensList;
      let searchParams = new URLSearchParams();
      return this._authHttp.get(requestUrl,{ headers: this.header, withCredentials: true });
    } else {
      let searchParams = new URLSearchParams();
      return this._authHttp.get(this._appconfig.apiPublicLens);
    }
  }
  // 跳转到首页，向服务器进行列表页关于用户的信息请求
  toGetWeatherInfor(): Observable<any> {
    let requestUrl = this._appconfig.apiWeather;
    return this._authHttp.get(requestUrl,{ 
      headers: this.header, 
      withCredentials: true,
    });
  }
  // 跳转到首页，向服务器请求todolist部分信息
  toGetPersonalThings(): Observable<any> {
    if (tokenNotExpired('jwt')) {
      let requestUrl = this._appconfig.apiUoloThings
      return this._authHttp.get(requestUrl,{ headers: this.header, withCredentials: true });
    } else {
      let requestUrl = this._appconfig.apiPublicThingsTodo
      return this._authHttp.get(requestUrl,{ headers: this.header, withCredentials: true });
    }
  }
  // 跳转至个人信息页面
  // turnPersonalPage(): Observable<any> {
  //   if (tokenNotExpired('jwt')) {
  //     let requestUrl = this._appconfig.apiArticleDetail;
  //     let searchParams = new URLSearchParams();
  //     var type = localStorage.getItem('detailType');
  //     var rpath = localStorage.getItem('detailPath');

  //     searchParams.set('type', type|| "md");
  //     searchParams.set('path', rpath || '');
  //     return this._authHttp.post(requestUrl, searchParams.toString(), { headers: this.header });
  //   } else {
  //     this._router.navigate(['/admin']);
  //   }
  // }
  
}
