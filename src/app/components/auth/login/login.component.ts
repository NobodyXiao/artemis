import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Account } from '../../../models/account';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ValidationService } from '../../../services/validation.service'
import { DialogService } from '../../../services/dialog.service';
import { Location } from '@angular/common';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DialogService, ValidationService, AuthService],
  host: {'(document:keyup)': 'onKeyUp($event)'}
})
export class LoginComponent implements OnInit {

  public loginAccount: Account = new Account();
  public registerAccount: Account = new Account();
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public isLogin = true;
  // 页面上用于显示错误存储变量
  private errorDataForLogin = {};
  private errorDataForRegister = {};
  public error : string = '';
  public dialogRef: MatDialogRef<any>;
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  private isRequestingForLogin: boolean = false;
  private isRequestingForReg: boolean = false;

  constructor(
    private _mdialog: MatDialog,
    private _dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private _ValidationService: ValidationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
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
        this._dialogService.alert('Error', err).subscribe();
      }
    );

    // 构建注册Form
    this.registerForm = this._formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      'email': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60), ValidationService.emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    });
    //订阅注册字段值的改变
    ValidationService.validateFieldChange(this.registerForm).subscribe(
      res => {
        this.errorDataForRegister = res;
      },
      err => {
        this._dialogService.alert('Error', err).subscribe();
      }
    );
  }

  // 切换登陆和注册的模式
  switchModel() {
    this.error = '';
    if(this.isRequestingForLogin){
      this.isRequestingForLogin = false;
    }
    if(this.isRequestingForReg){
      this.isRequestingForReg = false;
    }
    this.isLogin = !this.isLogin;
    // 清空登陆和注册时候的表单输入
    this.loginAccount.username = '';
    this.loginAccount.password = '';
    this.registerAccount.username = '';
    this.registerAccount.password = '';
    this.registerAccount.email = '';

    // 清空错误消息
    this.errorDataForLogin = {};
    this.errorDataForRegister = {};

    // 重置表单
    this.loginForm.reset();
    this.registerForm.reset();
    
    //订阅登陆字段的改变
    ValidationService.validateFieldChange(this.loginForm).subscribe(
      res => {
        this.errorDataForLogin = res;
      },
      err => {
        this._dialogService.alert('Error', err).subscribe();
      }
    );

    //订阅注册字段值的改变
    ValidationService.validateFieldChange(this.registerForm).subscribe(
      res => {
        this.errorDataForRegister = res;
      },
      err => {
        this._dialogService.alert('Error', err).subscribe();
      }
    );
    // 清除form表单的验证规则，更新规则
    this.loginForm.clearValidators();
    this.loginForm.updateValueAndValidity();
    this.registerForm.clearValidators();
    this.registerForm.updateValueAndValidity();
  }

  // 点击登陆按钮
  clickLogin(user: Account) {
    if(!this.isRequestingForLogin){
      this.isRequestingForLogin = true;
      this._authService.login(user).subscribe(
        res => {
          let result = res.json();
          if (result.code == 0) {
            //登录成功，导航到菜单页面
            localStorage.setItem('jwt', result.token.token);
            localStorage.setItem('username', result.user.username);
            if (this.backRouterLink === undefined) {
              this.backRouterLink = '/';
            }
            if (this.navigationExtras) {
              this._router.navigate([this.backRouterLink], this.navigationExtras);
            } else {
              this._router.navigate([this.backRouterLink]);
            }
          } else {
            this.error = '用户名或密码错误!'
          }
          this.isRequestingForLogin = false;
        },
        error => {
          this.error = '网络请求出去，等会再试吧!';
          this.isRequestingForLogin = false;
        }
      );
    }
  }
  onKeyUp(e:any) {
    if (e.keyCode === 13) {
      if(this.loginAccount.username && this.loginAccount.password){
        if (this.loginForm.valid) {
          this.clickLogin(this.loginAccount);
        } else {
          this.error = '用户名或密码错误';
        }
      }
    } else {
      this.error = '';
    }
  }
  // 点击注册按钮
  clickRegister(user: Account) {
    if(!this.isRequestingForReg){
      this.isRequestingForReg = true;
      this._authService.register(user).subscribe(
        res => {
          let result = res.json();
          if(result.code == 0){
            // 注册成功之后切换到登陆这边，让用户登陆
            this.switchModel();
            this.isLogin = true;
            this.loginAccount.username = result.user.username;
          }
          this.isRequestingForReg = false;
        },
        error => {
          this.error = '网络请求出错，等会再试吧!';
          this.isRequestingForReg = false;
        }
      );
    }
  }
}
