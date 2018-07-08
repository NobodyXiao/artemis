import { Inject, Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response, ResponseOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http'
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { GetTokenService } from './get-token.service';


import { Router } from '@angular/router';
import { APP_CONFIG } from '../../app/app-config';
import { IappConfig } from '../../app/iapp-config';
import { Account } from '../models/account';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

	response: Response = new Response(new ResponseOptions({body: '{"success":false, "unauthorized":true}'}));
	defaultHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
	userAvatarSubject = new Subject<any>();

  constructor(
		private _httpClient: HttpClient,
    private _http: Http,
		@Inject(APP_CONFIG) private _appconfig: IappConfig, 
		private _authHttp: AuthHttp,
    private _router: Router,
    private _GetTokenService:GetTokenService
	) {}

	// 更换头像
	changeAvatar(data:string){
		this.userAvatarSubject.next(data);
	}

	// 获取更换的头像
	getUpdateAvatar(): Observable<any>{
		return this.userAvatarSubject.asObservable();
	}
 
	//登录
	login(user: Account): Observable<any> {
		let requestUrl = this._appconfig.apiAuthLogin;
		let searchParams = new URLSearchParams();
		searchParams.set('username', user.username);
		searchParams.set('password', user.password);
		return this._httpClient.post(requestUrl, searchParams.toString(), {headers: this.defaultHeader});
	}

  register(user: Account): Observable<any> {
		let requestUrl = this._appconfig.apiAuthRegister;
		let searchParams = new URLSearchParams();
		searchParams.set('username', user.username);
    searchParams.set('password', user.password);
    searchParams.set('email', user.email);
		return this._httpClient.post(requestUrl, searchParams.toString(), {headers: this.defaultHeader});
  }
	//退出登录
	logout() {
		if (tokenNotExpired('jwt')) {
			localStorage.removeItem('jwt');
		}
	}

	//修改密码
	changePassword(pwd: any): Promise<any> {
		if (tokenNotExpired('jwt')) {
      let requestUrl = this._appconfig.apiAuth + '/au/reset/passwd';
      let searchParams = new URLSearchParams();
      searchParams.set('old', pwd.oldPassword);
      searchParams.set('new', pwd.newPassword);
			searchParams.set('confirm', pwd.confirmPassword);
      return this._httpClient.post(requestUrl, searchParams.toString(), {headers: this.defaultHeader}).toPromise();
    } else {
      return Promise.resolve(this.response);
    }
	}

	/**
   * 获取安全问题
   */
    getSecurityQuestion(loginname: string): Promise<any> {
		let requestUrl = this._appconfig.apiAuth + '/admin/auth/getsecurityquestion';	
		let searchParams = new URLSearchParams();
		searchParams.set('loginname', loginname);

		return this._httpClient.post(requestUrl, searchParams.toString(), {headers: this.defaultHeader}).toPromise();
    }

	/**
	 * 获取密码
	 * @param loginname
	 */
	sendResetEmail(loginname: string): Promise<any> {
		let requestUrl = this._appconfig.apiAuth + '/admin/forgetpassword/sendemail';
		let searchParams = new URLSearchParams();
		searchParams.set('loginname', loginname);
		return this._httpClient.post(requestUrl, searchParams.toString(), {headers: this.defaultHeader}).toPromise();
	}
	// 修改个人信息
	modifyPersonalInfor(postData:any): Observable<any>{
		let header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
		if(tokenNotExpired('jwt')){
			let requestUrl = this._appconfig.apiAuth + '/user/profile/save';
			return this._httpClient.post(requestUrl, JSON.stringify(postData), {headers: header});
		} else {
			return new Observable(observer => { observer.next(this.response); observer.complete();});
		}
	}

	// 上传头像
	uploadProfilePhoto(img:any): Observable<any>{
		if(tokenNotExpired('jwt')){
			let requestUrl = this._appconfig.apiAuth + '/user/profile/avatar/upload';
			let searchParams = new URLSearchParams();
			let userId = JSON.parse(localStorage.getItem('user'))['id'];
			searchParams.set('id', userId);
			searchParams.set('img', img);
			return this._httpClient.post(requestUrl, searchParams.toString(), {headers: this.defaultHeader});
		} else {
			return new Observable(observer => { observer.next(this.response); observer.complete();});
		}
	}
}

