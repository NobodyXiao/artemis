import { Component, OnInit, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { AppNavigationService } from '../../services/app-navigation.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
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
  weatherData:any = {
    cityName : '',
    dateInfor : '',
    week : '',
    weather : {
      humidity : "79",
      img : "01",
      info : "多云",
      temperature : "23"
    }
  }
  things: Array<any> = [{
    uuid: "",
    content: "欢迎来到UOLO，一个自我对话的空间，在这里成就不一样的自己"
  },
  {
    uuid: "",
    content: "注册成uolo一员， 让生活从此开始改变！"
  }];
  imgURL:string = '';
  weekArr: Array<any> = ['周一','周二','周三','周四','周五','周六','周日'];

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
    
    // 请求天气信息
    this._appNavigationService.toGetWeatherInfor().subscribe(
      res => {
        let resultData = res.json();
        if (resultData.error_code === 0) {
          //请求列表页数据成功，存储数据，绑定到页面
          let todayWeatherInfor = resultData.result.realtime;
          // 城市名字

          this.weatherData.cityName = todayWeatherInfor.city_name;

          this.weatherData.dateInfor = todayWeatherInfor.date;

          this.weatherData.weather = todayWeatherInfor.weather;

          this.weatherData.week = this.weekArr[todayWeatherInfor.week - 1];

          this.weatherData.airQuality = resultData.result.pm25.pm25.quality;

          this.imgURL = `./../../assets/images/weather-image${this.weatherData.weather.img}.png`;

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
    // 请求todo list部分接口
    this._appNavigationService.toGetPersonalThings().subscribe(
      res => {
        let resultData = res.json();
        if (resultData.code === 0) {
          //请求列表页数据成功，存储数据，绑定到页面
          for (let data of resultData.things) {
            console.log(data)
            var d = {
              uuid: data.uuid,
              content: data.content
            }
            this.things.push(d)
          }
          console.log('123', this.things);
        } else {
          this._dialogService.alert('Error',this.error);
        }
      },
      error => {
        this._dialogService.alert('Error',this.error);
      }
    );
  }
  //点击列表页的文章，要向上发送事件，使首页响应事件并跳转
  toHomePage(event){
    this.eventToEmitHome.emit(event);
  }
}
