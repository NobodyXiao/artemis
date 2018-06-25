import { Component, ChangeDetectorRef, OnInit, ViewEncapsulation, AfterViewChecked} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { ValidationService } from '../../services/validation.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DistinctUntilChangedService } from '../../services/distinct-until-changed-service.service';

@Component({
  selector: 'app-personal-infor',
  templateUrl: './personal-infor.component.html',
  styleUrls: ['./personal-infor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalInforComponent implements OnInit, AfterViewChecked{

  isEditing:boolean = false;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  hobby:Array<any> = [];
  httpRequestCallbackError:boolean = false;
  personalInforForm:FormGroup;
  personalInforOrg:any = {};
  personalInfor:any = {
    nickName:'',
    sex:0,
    birthday:'',
    livePlace:'',
    profession:'',
    hobby:this.hobby,
    id:''
  };
  maxDate: Date = new Date();
  errorData: any = {};
  userInforObj:any = {};
  hasChanged:boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _ref: ChangeDetectorRef,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) { }

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
      'nickName': [this.personalInfor.nickName, [Validators.minLength(2)]],
      'sex': [this.personalInfor.sex],
      'birthday': { disabled: true, value: this.personalInfor.birthday},
      'livePlace': [this.personalInfor.livePlace],
      'profession': [this.personalInfor.profession],
      'hobby':[this.personalInfor.hobby]}, 
      {validator: ValidationService.equalDisabledValidator(this.personalInforOrg)});
    //订阅表单字段的改变
    ValidationService.validateFieldChange(this.personalInforForm).subscribe(
      res => {
        
        this.httpRequestCallbackError = false;
        this.errorData = res;
        this.hasChanged = !DistinctUntilChangedService.compare(this.personalInfor, this.personalInforOrg);
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

    // Add our fruit
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
      this.personalInfor.sex = Number(this.personalInfor.sex);
      if (Object.keys(this.personalInfor).length > 0) {
        //submit
        this._authService.modifyPersonalInfor(this.personalInfor).subscribe(
          res => {
            try {
              let result = res.json();
              if (result.code === 0) {
                //更新原始数据
                this.personalInforOrg = Object.assign(this.personalInforOrg, this.personalInfor);
                // 更新本地的localstorage
                localStorage.setItem('user', JSON.stringify(this.personalInfor));
                this.personalInforForm.updateValueAndValidity();
                this.hasChanged = false;
                return Promise.resolve({success: true});
              } else if (result.unauthorized) {
                this._router.navigate(['/admin'], {queryParams: {backRouterLink: this._router.url}});
              } else {
                this._dialogService.alert("Error", result.msg);
                return Promise.resolve({success: false, msg: result.msg});
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

  ngAfterViewChecked() {
    this._ref.detectChanges();
  }

}
