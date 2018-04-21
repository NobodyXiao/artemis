import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core'
import { Account } from '../../../models/account';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA} from '@angular/material/'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ValidationService } from '../../../services/validation.service'
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginAccount: Account = new Account();
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  private isLogin = true;
  // 页面上用于显示错误存储变量
  private errorDataForLogin = {};
  private errorDataForRegister = {};
  constructor(
    private _dialogRef: MatDialogRef<LoginComponent>,
    private _dialog: DialogService,
    private _formBuilder: FormBuilder,
    private _ValidationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit() {

    // 构建登陆Form
    this.loginForm = this._formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
    //订阅登陆字段的改变
    ValidationService.validateFieldChange(this.loginForm).subscribe(
      res => {
        this.errorDataForLogin = res;
      },
      err => {
        this._dialog.alert('Error', err).subscribe();
      }
    );

    // 构建注册Form
    this.registerForm = this._formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    });
    //订阅注册字段值的改变
    ValidationService.validateFieldChange(this.registerForm).subscribe(
      res => {
        this.errorDataForRegister = res;
      },
      err => {
        this._dialog.alert('Error', err).subscribe();
      }
    );
  }

  // 切换登陆和注册的模式
  switchModel() {
    this.isLogin = !this.isLogin;
    // 清空登陆和注册时候的表单输入
    this.loginForm.get('username').reset('');
    this.loginForm.get('password').reset('');
    this.registerForm.get('username').reset('');
    this.registerForm.get('password').reset('');
    // 清空错误消息
    this.errorDataForLogin = {};
    this.errorDataForRegister = {};
  }

  // 点击登陆按钮
  clickLogin() {
    console.log('login',this.loginForm);
  }
  // 点击注册按钮
  clickRegister() {
    console.log('register', this.registerForm);
  }
}
