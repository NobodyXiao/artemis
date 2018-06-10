import { Inject, Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response, ResponseOptions } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { GetTokenService } from './get-token.service';


import { Router } from '@angular/router';
import { APP_CONFIG } from '../../app/app-config';
import { IappConfig } from '../../app/iapp-config';
import { Account } from '../models/account';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

	response: Response = new Response(new ResponseOptions({body: '{"success":false, "unauthorized":true}'}));
	header:Headers  = new Headers({'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8'});

  constructor(
    private _http: Http,
		@Inject(APP_CONFIG) private _appconfig: IappConfig, 
		private _authHttp: AuthHttp,
    private _router: Router,
    private _GetTokenService:GetTokenService
	) {}
 
	//登录
	login(user: Account): Observable<any> {
		let requestUrl = this._appconfig.apiAuthLogin;
		let searchParams = new URLSearchParams();
		searchParams.set('username', user.username);
		searchParams.set('password', user.password);
		return this._http.post(requestUrl, searchParams.toString(), {headers: this.header});
	}

  register(user: Account): Observable<any> {
		let requestUrl = this._appconfig.apiAuthRegister;
		let searchParams = new URLSearchParams();
		searchParams.set('username', user.username);
    searchParams.set('password', user.password);
    searchParams.set('email', user.email);
		return this._http.post(requestUrl, searchParams.toString(), {headers: this.header});
  }
	//退出登录
	logout() {
		if (tokenNotExpired('jwt')) {
			localStorage.removeItem('jwt');
		}
		this._router.navigate(['/admin']);
	}

	//修改密码
	changePassword(pwd: any): Promise<any> {
		if (tokenNotExpired('jwt')) {
      let requestUrl = this._appconfig.apiAuth + '/admin/auth/changepwd';
      let searchParams = new URLSearchParams();
      searchParams.set('oldPassword', pwd.oldPassword);
      searchParams.set('newPassword', pwd.newPassword);
			searchParams.set('confirmPassword', pwd.confirmPassword);
      return this._authHttp.post(requestUrl, searchParams.toString(), {headers: this.header}).toPromise();
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

		return this._authHttp.post(requestUrl, searchParams.toString(), {headers: this.header}).toPromise();
    }

	/**
	 * 获取密码
	 * @param loginname
	 */
	sendResetEmail(loginname: string): Promise<any> {
		let requestUrl = this._appconfig.apiAuth + '/admin/forgetpassword/sendemail';
		let searchParams = new URLSearchParams();
		searchParams.set('loginname', loginname);

		return this._authHttp.post(requestUrl, searchParams.toString(), {headers: this.header}).toPromise();
	}
}

