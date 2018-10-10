import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AppNavigationService } from '../../services/app-navigation.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailPageComponent implements OnInit {

  textData: string = '';
  getDetailParam: any = {};
  timerObserver: Subscription;
  error:string  = '';
  title: string = '';
  articleObj: any = {};

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public _appNavigationService: AppNavigationService,
    private _dialogService: DialogService,
  ) { 
  }
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  ngOnInit() {
    // this._markdown.renderer.image = (quote: string) => {
    //   return `<div class="img-box"><img src=${quote} /></div>`;
    // }
    this._appNavigationService.turnDetailPage().subscribe(
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
            this.textData = result.content;
          }
        } else {
          this.error = '服务器出错!'
          this._dialogService.alert('Error','服务器出错');
        }
      },
      error => {
        this.error = '网络请求出错，等会再试吧!';
        this._dialogService.alert('Error','网络请求出去，等会再试吧!');
      }
    );
    this._route.queryParams.subscribe((params: Params) => {
      this.articleObj = params;
      if('title' in params){
        this.title = params.title;
      }
    });
  }

  likeAction(){
  }
}
