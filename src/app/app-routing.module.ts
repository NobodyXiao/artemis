import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from './guards/auth-guard.service';
import {LoginComponent} from '../app/components/auth/login/login.component';

const APP_ROUTES: Routes = [
    {
      path: '',
      component: LoginComponent,
      // component: FrameworkComponent,
      // canActivate: [AuthGuard],
      // canActivateChild: [AuthGuard],

    },
    {
      path: 'admin',
      loadChildren: 'app/components/auth/login/login.module#LoginModule'
    },
    // {
    //   path: 'fillegaccountinfo',
    //   loadChildren: 'app/components/enterprise-generic-account/enterprise-generic-account.module#EnterpriseGenericAccountModule'
    // },
    // {
    //   path: 'setpassword',
    //   loadChildren: 'app/components/auth/reset-password/reset-password.module#ResetPasswordModule'
    // },
    // {
    //   path: 'selector',
    //   loadChildren: 'app/components/available-selector/available-selector.module#AvailableSelectorModule'
    // },
    // {
    //   path: 'r',
    //   loadChildren: 'app/components/respondent-participate-survey/respondent-participate-survey.module#RespondentParticipateSurveyModule'
    // },
];

const appRouting = RouterModule.forRoot(APP_ROUTES);

@NgModule({
  imports: [
    appRouting,
],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
