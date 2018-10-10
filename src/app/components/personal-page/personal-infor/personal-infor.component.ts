import { Component, ChangeDetectorRef, OnInit, ViewEncapsulation, AfterViewChecked} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';
import { ValidationService } from '../../../services/validation.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DistinctUntilChangedService } from '../../../services/distinct-until-changed-service.service';

@Component({
  selector: 'app-personal-infor',
  templateUrl: './personal-infor.component.html',
  styleUrls: ['./personal-infor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalInforComponent implements OnInit, AfterViewChecked{

  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  hobby:Array<any> = [];
  httpRequestCallbackError:boolean = false;
  personalInforForm:FormGroup;
  personalInforOrg:any = {};
  personalInfor:any = {
    nickname:'',
    sex:0,
    birth:'',
    // livePlace:'',
    profession:'',
    // hobby:this.hobby,
    id:'',
    email:'',
    avatar:'',
    username:'',
    phone:''
  };
  maxDate: Date = new Date();
  errorData: any = {};
  userInforObj:any = {};
  hasChanged:boolean = false;
  birthFormatError:string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _ref: ChangeDetectorRef,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.userInforObj =JSON.parse(localStorage.getItem('user'));
    this.personalInfor = this.userInforObj;
    this.personalInfor.sex = this.userInforObj.sex.toString();
    this.personalInforOrg = Object.assign({}, this.personalInfor);
    this.buildForm();
  }
  // 构建form
  buildForm(): void {
    this.personalInforForm = this._formBuilder.group({
      'sex': [this.personalInfor.sex],
      // 'hobby':[this.personalInfor.hobby],
      'birth': [this.personalInfor.birth],
      // 'livePlace': [this.personalInfor.livePlace],
      'profession': [this.personalInfor.profession],
      'nickname': [this.personalInfor.nickname, [Validators.minLength(2)]],
      'email':{ disabled:true,value: this.personalInfor.email},
      'phone':[this.personalInfor.phone, ValidationService.cellPhoneValidator]}, 
      {validator: ValidationService.equalDisabledValidator(this.personalInforOrg)});
    //订阅表单字段的改变
    ValidationService.validateFieldChange(this.personalInforForm).subscribe(
      res => {
        this.httpRequestCallbackError = false;
        this.errorData = res;
        let tempPersonalInfor = Object.assign({},this.personalInfor);
        let tempPersonalInforOrg = Object.assign({},this.personalInforOrg);
        tempPersonalInfor.birth = new Date(tempPersonalInfor.birth).getTime();
        tempPersonalInforOrg.birth = new Date(tempPersonalInforOrg.birth).getTime();
        this.hasChanged = !DistinctUntilChangedService.compare(tempPersonalInfor, tempPersonalInforOrg);
      },
      err => {
        this._dialogService.alert('Error', err).subscribe();
      }
    );
  }

  // 添加兴趣爱好
  addHobby(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our hobby
    if ((value || '').trim()) {
      this.hobby.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // 删除兴趣爱好
  removeHobby(hobby: any): void {
    let index = this.hobby.indexOf(hobby);
    if (index >= 0) {
      this.hobby.splice(index, 1);
    }
  }

  // 保存修改信息
  save(){
    if (this.personalInforForm.valid) {
      let postData = Object.assign({}, this.personalInfor);
      postData.sex = Number(postData.sex);
      if (Object.keys(this.personalInfor).length > 0) {
        //submit
        this._authService.modifyPersonalInfor(postData).subscribe(
          res => {
            try {
              if (res.code === 0) {
                //更新原始数据
                this.personalInforOrg = Object.assign(this.personalInforOrg, this.personalInfor);
                // 更新本地的localstorage
                localStorage.setItem('user', JSON.stringify(this.personalInfor));
                this.hasChanged = false;
                this.personalInforForm.updateValueAndValidity();
                return Promise.resolve({success: true});
              } else if (res.unauthorized) {
                this._router.navigate(['/admin'], {queryParams: {backRouterLink: this._router.url}});
              } else {
                this._dialogService.alert("Error", res.msg);
                return Promise.resolve({success: false, msg: res.msg});
              }
            } catch (err) {
              this._dialogService.alert("Error", err);
              return Promise.resolve({success: false, msg: err});
            }
          },
          err => {
            this._dialogService.alert('Error', err);
            return Promise.resolve({success: false, msg: err});
          }
        );
      } else {
        return Promise.resolve({success: true});
      }
    } else {
      this._dialogService.alert("Error", 'Form fields may not be submitted with invalid values');
      return Promise.resolve({success: false, msg: 'Form fields may not be submitted with invalid values'});
    }
  }

  //  生日更改
  birthChange(m: string, event) {
    this.birthFormatError = '';
    let date:Date = event.value;
    if (event.value instanceof Date) {
      this.personalInfor.birth = date.toISOString();
    } else {
      this.birthFormatError = 'birth format error';
    }
  }

  ngAfterViewChecked() {
    this._ref.detectChanges();
  }

}
