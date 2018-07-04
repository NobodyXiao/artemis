import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { ValidationService } from '../../../services/validation.service';
import { DialogService } from '../../../services/dialog.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
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

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
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
    //订阅字段值的改变
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
    this._authService.changePassword(this.passwordDatas).then(
      res => {
        try {
          let result = res.json();
          if (result.success) {
            //成功则关闭对话框
          } else if (result.unauthorized) {
            this._router.navigate(['/admin'], { queryParams: { backRouterLink: this._router.url } });
          } else {
            if (result.msg instanceof Object) {
              //显示Form错误信息
              this.errorData = result.msg;
              ValidationService.setErrors(this.passwordChangeForm, this.errorData);
            } else {
              //显示非Form错误信息
              this._dialogService.alert('Error', result.msg);
            }
          }
        } catch (e) {
          this._dialogService.alert("Error", e);
        }
      }
    ).catch(err => { this._dialogService.alert('Error', err) });
  }
}

