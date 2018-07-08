import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute,  Params, NavigationExtras } from '@angular/router';
import { ValidationService } from '../../../services/validation.service';
import { DialogService } from '../../../services/dialog.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {

  passwordChangeForm: FormGroup;
  passwordDatas: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errorData: any = {};
  httpRequestSuccess: boolean = false;
  public backRouterLink: string;
  public navigationExtras: NavigationExtras;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      let fullParam = params["backRouterLink"]
      if (fullParam) {
        let index = fullParam.indexOf('?');
        if (index > -1) {
          this.backRouterLink = fullParam.substr(0, index);
          this.navigationExtras = {
            queryParams:  fullParam.substr(index + 1, fullParam.length),
          };
        } else {
          this.backRouterLink = fullParam;
        }
      }
    });

    this.buildForm();
  }
  /**
     * 构建表单
     */
  buildForm(): void {
    this.passwordChangeForm = this._formBuilder.group({
      'oldPassword': [this.passwordDatas.oldPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
      'passwordGroup': this._formBuilder.group({
        'newPassword': [this.passwordDatas.newPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
        'confirmPassword': [this.passwordDatas.confirmPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(14)]]
      }, { validator: ValidationService.passwordMatchValidator() })
    });
    //订阅字段值的改变required
    ValidationService.validateFieldChange(this.passwordChangeForm).subscribe(
      res => {
        this.errorData = res;
      },
      err => {
        this._dialogService.alert('Error', err);
      }
    );
  }

  /**
   * 修改密码
   */
  edit() {
    // 验证新旧密码不能相等，且新密码必须等于确认密码 
    if (this.passwordDatas.oldPassword === this.passwordDatas.newPassword) {
      this._dialogService.alert('Error', '新老密码不能一致');
    } else {
      this._authService.changePassword(this.passwordDatas).then(
        res => {
          try {
            if (res.code === 0) {
              //成功则关闭对话框
              this.httpRequestSuccess = true;
              this._dialogService.alert('Message', '密码修改成功').subscribe(
                res => {
                  if (res) {
                    this._router.navigate(['/profile']);
                  }
                }
              );
            } else if (res.unauthorized) {
              this._router.navigate(['/admin'], { queryParams: { backRouterLink: this._router.url } });
            } else {
              if (res.message instanceof Object) {
                //显示Form错误信息
                this.errorData = res.message;
                ValidationService.setErrors(this.passwordChangeForm, this.errorData);
              } else {
                //显示非Form错误信息
                this._dialogService.alert('Error', res.message);
              }
            }
          } catch (e) {
            this._dialogService.alert("Error", e);
          }
        }
      ).catch(err => { this._dialogService.alert('Error', err) });
    }
  }
}

