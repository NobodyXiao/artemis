import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() {
  }
  
  //是否能过够进行路由导航
  canDeactivate(component: CanComponentDeactivate) {
    if (!component.canDeactivate) {
      return new Promise<boolean>(resolve => { return resolve(true); });
    }
    
    var retValue = component.canDeactivate();
      
    if (retValue instanceof Observable) {
      return this.intercept(retValue);
    } else {
      return retValue;
    }
  }
  
  //终端路由导航
  private intercept(observable: Observable<any>): Observable<any> {
    return observable.flatMap((res) => {
      if (res.changed === true) {
         res.component.handleChange();

        return res.component.canNavigate;
      } else {
        return Observable.of(!res.changed);
      }
    });
  }
}

