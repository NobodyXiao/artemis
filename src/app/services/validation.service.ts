import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
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
      'invalidCellPhone': 'Invalid cell phone'
    };
    return config[validatorName];
  }

  // 校验邮箱格式
  static emailValidator(control) {
    // tslint:disable-next-line:max-line-length
    if (control.value && control.value.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/i)) {
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
                    for (let fieldName in errorData) {
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

  //  校验对象的字段值是否与FormGroup中对应字段的值相等
  static equalDisabledValidator(validateObj) {
    return (g): { [key: string]: any } => {
      let flag = false;

      let validateForm = function (gvalue) {
        for (let propertyName in gvalue) {
          if (gvalue[propertyName] instanceof Object) {
            validateForm(gvalue[propertyName]);
          } else {
            if (typeof gvalue[propertyName] === 'string' && typeof validateObj[propertyName] === 'string') {
              if (gvalue[propertyName].trim() !== validateObj[propertyName].trim()) {
                flag = true;
                break;
              }
            } else {
              if (gvalue[propertyName] !== validateObj[propertyName]) {
                flag = true;
                break;
              }
            }
          }
        }
      }
      validateForm(g.value);
      if (flag) {
        return null;
      } else {
        return { 'equalDisabled': true };
      }
    }
  }

  static setErrors(formGroup: FormGroup, errorData: any) {
    for(let fieldName in errorData) {
      formGroup.controls[fieldName].setErrors({fieldName: true});
    }
  }

  //校验cell phone
  static cellPhoneValidator(control) {
    if (control.value) {
      if (control.value.match(/^[0-9][0-9\s-]*$/)) {
        return null;
      } else {
        return { 'invalidCellPhone': true };
      }
    }
    return null;
  }
}
