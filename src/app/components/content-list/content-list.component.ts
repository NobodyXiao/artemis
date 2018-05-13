import { Component, OnInit, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { AppNavigationService } from '../../services/app-navigation.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentListComponent implements OnInit {

  constructor(
    private _appNavigationService: AppNavigationService,
    private _dialogService: DialogService
  ) { }

  @Output() eventToEmitHome = new EventEmitter;
  public userArticlesList:any = [];
  private error = '';

  ngOnInit() {
    // 跳转到首页的时候，我要进行首页用户基本信息的获取
    this._appNavigationService.toGetUserHomeList().subscribe(
      res => {
        let result = res.json();
        if (result.code == 0) {
          //请求列表页数据成功，存储数据，绑定到页面上
          this.userArticlesList = result.lensList.articles;
        } else {
          this.error = '服务器出错!';
          this._dialogService.alert('Error',this.error);
        }
      },
      error => {
        this.error = '网络请求出去，等会再试吧!';
        this._dialogService.alert('Error',this.error);
      }
    );
  }
  //点击列表页的文章，要向上发送事件，使首页响应事件并跳转
  toHomePage(event){
    this.eventToEmitHome.emit(event);
  }
}
