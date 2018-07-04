import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(){

  }
  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("request interceptor:", request);
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request);
  }
}