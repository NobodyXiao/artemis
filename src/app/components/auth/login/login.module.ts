import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { GetTokenService } from '../../../services/get-token.service';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { DialogModule } from '../../dialog/dialog.module';

export const LOGIN_ROUTES: Routes = [
    {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LOGIN_ROUTES),
    DialogModule
  ],
  declarations: [LoginComponent, ForgetPasswordComponent],
  providers: [AuthService, GetTokenService], 
  entryComponents: [ForgetPasswordComponent,]
})
export class LoginModule { }
