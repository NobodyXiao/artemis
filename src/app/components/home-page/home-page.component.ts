import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../services/window-ref.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AppNavigationService } from '../../services/app-navigation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers:[ AppNavigationService ]
})

export class HomePageComponent implements OnInit {
  constructor(
    private winRef: WindowRefService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _appNavigationService: AppNavigationService
  ) {}
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  error:string = '';
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
    // 跳转到首页的时候，我要进行首页用户基本信息的获取

  }
  turnDetailPage(){
    console.log('事件发送至首页');
    this._appNavigationService.turnDetailPage('123').subscribe(
      res => {
        let result = res.json();
        if (result.code == 0) {
          //登录成功，导航到菜单页面
          if (this.backRouterLink === undefined) {
            this.backRouterLink = '/';
          }
          if (this.navigationExtras) {
            this._router.navigate([this.backRouterLink], this.navigationExtras);
          } else {
            this._router.navigate(['/detail']);
          }
        } else {
          this.error = '服务器出错!'
        }
      },
      error => {
        this.error = '网络请求出去，等会再试吧!';
      }
    );
  }
}
