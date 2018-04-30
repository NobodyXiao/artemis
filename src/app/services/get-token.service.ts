import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {
  Http,
  RequestOptionsArgs,
  RequestOptions,
  Response,
  Headers
} from '@angular/http';

const mergeToken = (options: RequestOptionsArgs = {}) => { 
  const newOptions = new RequestOptions({}).merge(options);
  console.log('111',newOptions);
  const newHeaders = new Headers(newOptions.headers);
  console.log('222',newHeaders);
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    newHeaders.set('Authorization', `Bearer ${jwt}`);
  }
  newOptions.headers = newHeaders;
  console.log('333',newHeaders);
  return newOptions;
};

@Injectable()
export class GetTokenService {

  constructor(private http: Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> { 
    return this.http.get(url, mergeToken(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, mergeToken(options));
  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, mergeToken(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, mergeToken(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, mergeToken(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(url, mergeToken(options));
  }

}