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

@Injectable()
export class AppNavigationService {

	response: Response = new Response(new ResponseOptions({body: '{"success":false, "unauthorized":true}'}));
	header:Headers  = new Headers({'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8'});
  constructor(
    private _http: Http,
		@Inject(APP_CONFIG) private _appconfig: IappConfig, 
		private _authHttp: AuthHttp,
    private _router: Router
	) {}
  turnDetailPage(param:string): Observable<any> {
    if (tokenNotExpired('jwt')) {
      let requestUrl = this._appconfig.apiEndpoint + '/lens/article/detail';
      let searchParams = new URLSearchParams();
      searchParams.set('type', 'html');
      searchParams.set('path', './asd');
      return this._authHttp.post(requestUrl, searchParams.toString(), { headers: this.header });
    } else {
      this._router.navigate(['/admin']);
    }
  }
}
