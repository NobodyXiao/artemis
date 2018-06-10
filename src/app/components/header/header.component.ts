import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/RX';
import { Http, URLSearchParams, Headers, Response, ResponseOptions } from '@angular/http';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AppNavigationService } from '../../services/app-navigation.service';
import { DialogService } from '../../services/dialog.service';
import { AuthService } from '../../services/auth.service';
import { tokenNotExpired } from 'angular2-jwt';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public _appNavigationService: AppNavigationService,
    private _dialogService: DialogService,
    private _authService: AuthService,
    public Location: Location
  ) { }

  userName: string = 'user';
  scrollHeight: number = 0;
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  isLogin:boolean = false;
  ngOnInit() {
    Observable.fromEvent(window,'scroll').subscribe(
      (event) => {
        const h = document.documentElement.clientHeight;
        const H = document.body.clientHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollHeight = scrollTop;
      }
    )

    if (localStorage.getItem('username') !== undefined) {
      this.userName = localStorage.getItem('username');
    }
    if (tokenNotExpired('jwt')) {
      this.isLogin = true;
    }
    // gonghuan: 这里对于header而言，没有 queryParams 可观察对象， 所以不会从路由中获取到这些数据
    // 对于home页面，如果是用户输入的地址， 这里的queryparams为空
    // 对于登陆页面跳转过来， 这里queryparams为 clickLogin中原先传递给login模块的backrouterlink的参数
    // 对于detail页面， queryparams是homepage传递过来的Title对象
    // 而目前header的设计， 需要的信息只是user profile 信息和登陆信息， 所以这些都没有用
    /*
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
    */
  //   this._appNavigationService.turnDetailPage().subscribe(
  //     res => {
  //       let result = res.json();
  //       if (result.code == 0) {
  //         //登录成功，导航到菜单页面
  //         if (this.backRouterLink === undefined) {
  //           this.backRouterLink = '/';
  //         }
  //         if (this.navigationExtras) {
  //           this._router.navigate([this.backRouterLink], this.navigationExtras);
  //         } else {
  //           this.textData = result.content;
  //         }
  //       } else {
  //         this.error = '服务器出错!'
  //         this._dialogService.alert('Error','服务器出错');
  //       }
  //     },
  //     error => {
  //       this.error = '网络请求出去，等会再试吧!';
  //       this._dialogService.alert('Error','网络请求出去，等会再试吧!');
  //     }
  //   );
  }
  onLogoClicked() {
    this._router.navigate(['/'])
  }

  onEnter($event, text_value) {
    $event.stopPropagation()
    window.open("https://www.baidu.com/s?wd=" + text_value, "", "", false);
  }

  routerToProfilePage() {
    this._router.navigate(['/personal']);
  }
  onLogin() {
    this._router.navigate(['/login'], {
      queryParams: {
        backRouterLink: this.Location.path(),
      },
    });
  }
  // 退出登陆 login 是登陆， loginOut是什么？？？
  onLogOut() {
    this._authService.logout();
    this.isLogin = false;
  }
} 
