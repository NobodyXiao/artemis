import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

export const LOGIN_ROUTES: Routes = [
    {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LOGIN_ROUTES),
  ],
  declarations: [LoginComponent],
  providers: [],
  exports: []
})
export class LoginModule { }
