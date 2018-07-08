import { Component, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { coms } from '../../../models/comMgr';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page-dynamic.component.html',
  styleUrls: ['./personal-page-dynamic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalPageDynamicComponent implements OnInit{

  @ViewChild('dmroom', {read: ViewContainerRef}) dmRoom: ViewContainerRef
  personalItemArr:Array<any> = [ '个人资料', '安全设置', 'Uolo大事记'];
  selecteditem:number = -1;
  showModifyAvaBox:boolean = false;
  data: any;
  cropperSettings: CropperSettings;
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  isUpLoadSuccess:boolean = false;
  //avaUrl:string = '/assets/userLogo.png';
  avaUrl:string = 'https://api.echoface.cn/user/profile/avatar?sz=middle';

  @ViewChild('cropper', undefined)cropper:ImageCropperComponent;

  constructor(
    private cfr: ComponentFactoryResolver,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _dialogService: DialogService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 256;
    this.cropperSettings.height = 256;
    this.cropperSettings.croppedWidth = 256;
    this.cropperSettings.croppedHeight = 256;
    this.cropperSettings.canvasWidth = 350;
    this.cropperSettings.canvasHeight = 350;
    this.cropperSettings.rounded = true;

    this.data = {};
  }

  ngOnInit() {
    this.addItemComponent(0);
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

  addItemComponent(index){
    let com = this.cfr.resolveComponentFactory(coms[index]);
    this.dmRoom.clear();
    this.dmRoom.createComponent(com);
    this.selecteditem = index;
  }

  modifyAva(){
    this.showModifyAvaBox = true;
  }

  fileChangeListener($event) {
    this.isUpLoadSuccess = false;
    let image:any = new Image();
    let file:File = $event.target.files[0];
    let reader:FileReader = new FileReader();
    let that = this;
    reader.onload = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
        that.isUpLoadSuccess = true;
    };
    reader.onerror = function () {
      that.isUpLoadSuccess = false;
      that._dialogService.alert("Error", '上传图片失败，请重新上传');
  };

    reader.readAsDataURL(file);
  }

  // 上传头像
  uploadAva() {
    let base64ImageData = this.data.image.split('base64,')[1];
    if (this.isUpLoadSuccess) {
      this._authService.uploadProfilePhoto(base64ImageData).subscribe(
        res => {
          let result = res;
          if (result.code == 0) {
            if (this.data.image) {
              this.avaUrl = this.data.image;
              this._authService.changeAvatar(this.avaUrl);
            }
            this.showModifyAvaBox = false;
          } else {
            this._dialogService.alert("Error", result.message);
          }
        }, err => {
          this._dialogService.alert('Error', err);
        }
      );
    } else {
      this._dialogService.alert("Error", '请检查是否选择了图片或者请重新上传');
    }
  }

  // 取消上传
  cancleUpload(){
    this.showModifyAvaBox = false;
  }
}
