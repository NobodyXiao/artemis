import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url:string): boolean {
    // Check to see if a user has a valid JWT
    if (tokenNotExpired('jwt')) {
      // If they do, return true and allow the user to load the component
      return true;
    }

    // If not, they redirect them to the login page
    this.router.navigate(['/admin'], {queryParams: {backRouterLink: url}});
    return false;
  }
}
