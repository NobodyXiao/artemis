import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth-guard.service';
import { HomePageComponent } from '../app/components/home-page/home-page.component';

const APP_ROUTES: Routes = [
    {
      path: '',
      component: HomePageComponent,
      // canActivate: [AuthGuard],
      // canActivateChild: [AuthGuard]
    },
    {
      path: 'login',
      loadChildren: 'app/components/auth/login/login.module#LoginModule'
    },
    {
      path: 'detail',
      loadChildren: 'app/components/detail-page/detail-page.module#DetailpageModule'
    },
    {
      path: 'personal',
      loadChildren: 'app/components/personal-page/personal-page.module#PersonalPageModule',
      // canActivate: [AuthGuard],
      // canActivateChild: [AuthGuard]
    }
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
  imports: [ appRouting ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
