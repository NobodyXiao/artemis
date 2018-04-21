import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Observable} from 'rxjs/Observable';
@Injectable()
export class ValidationService {

  constructor() { }
  // 产生错误信息的函数
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'This field is required',
      'minlength': `Min length ${validatorValue.requiredLength} characters`,
      'maxlength': `Max length ${validatorValue.requiredLength} characters`,
      'invalidEmailAddress': 'Invalid Email Address',
    };
    return config[validatorName];
  }
  // 校验邮箱格式
  static emailValidator(control) {
    // tslint:disable-next-line:max-line-length
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
  //订阅校验字段的修改
  static validateFieldChange(fromGroup: FormGroup | any) {
    return Observable.create(observer => {  
      let errorData = [];
      let validateForm = function (fromGroup) {
          for (let fieldName in fromGroup.controls) {
            if (fromGroup.controls[fieldName] instanceof FormGroup) {
              validateForm(fromGroup.controls[fieldName]);
            } else {
              let flag = false;
              //校验字段
              fromGroup.controls[fieldName].valueChanges.subscribe(
                c => {
                    //先校验字段
                    let control = fromGroup.controls[fieldName];
                    if (!control.valid) {
                      for (let propertyName in control.errors) {
                        if (control.errors.hasOwnProperty(propertyName) && control.dirty) {
                          errorData[fieldName] = ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName] instanceof Object ? control.errors[propertyName] : {});
                          observer.next(errorData);
                          flag = true;
                          break;
                        }
                      }
                    } else {
                      errorData[fieldName] = '';
                      observer.next(errorData);
                    }
                },
                error => {
                  Observable.throw(error);
                }
            );

            if (!flag) {
              //校验字段组
              fromGroup.valueChanges.subscribe(
                c => {
                  if (!fromGroup.valid) {

                    let lastFieldName = '';
                    for (let fieldName in fromGroup.controls) {
                      lastFieldName = fieldName;
                    }
                    if (fromGroup.errors) {
                      for (let propertyName in fromGroup.errors) {
                          errorData[lastFieldName] = ValidationService.getValidatorErrorMessage(propertyName, fromGroup.errors[propertyName] instanceof Object ? fromGroup.errors[propertyName] : {});
                      }
                    }
                  } else {
                    for(let fieldName in errorData) {
                      errorData[fieldName] = '';
                    }
                  }
                },
                error => {
                  Observable.throw(error);
                }
              );
            }
          }
        }
      }
      validateForm(fromGroup);
    });
  }
}
