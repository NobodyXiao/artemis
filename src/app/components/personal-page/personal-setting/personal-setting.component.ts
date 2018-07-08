import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-personal-setting',
  templateUrl: './personal-setting.component.html',
  styleUrls: ['./personal-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalSettingComponent implements OnInit {

  password: string = '';
  email: string = 'zhihuihuan@gmail.com';
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      if (params['backRouterLink']) {
        let index = params['backRouterLink'].indexOf('?');
        if (index > -1) {
          this.backRouterLink = params['backRouterLink'].substr(0, index);
        } else {
          this.backRouterLink = params['backRouterLink'];
        }
        this.navigationExtras = {
          queryParams: this._router.parseUrl(params['backRouterLink']).queryParams,
        };
      }
    });
  }

  // 修改密码
  modifyPassword(){
    //  登陆状态允许修改密码，否则跳转至登陆页面
    if(tokenNotExpired('jwt')){
      this._router.navigate(['/profile/modify-password']);
    } else {
      this._router.navigate(['/login'], this.navigationExtras);
    }
  }

  // 修改邮箱
  modifyEmail() {
    //  登陆状态允许修改邮箱，否则跳转至登陆页面
    if (tokenNotExpired('jwt')) {
      this._router.navigate(['/profile/modify-email']);
    } else {
      this._router.navigate(['/login'], this.navigationExtras);
    }
  }  
}
