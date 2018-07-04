import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageModule } from '../home-page/home-page.module';
import { DialogModule } from '../dialog/dialog.module';
import { PersonalPageDynamicHostDirective } from '../../directives/personal-page-dynamic-host.directive';
import { importComs } from '../../models/comMgr';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { PersonalPageFrameworkComponent } from './personal-page-framework/personal-page-framework.component';
import { PersonalPageDynamicComponent } from './personal-page-dynamic/personal-page-dynamic.component';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";

export const PERSONALPAGE_ROUTES: Routes = [
  {
    path: '', component: PersonalPageFrameworkComponent,
    children: [
      { path: '', component: PersonalPageDynamicComponent },
      { path: 'modify-email', component: ChangeEmailComponent },
      { path: 'modify-password', component: ChangePasswordComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatDatepickerModule,
    RouterModule.forChild(PERSONALPAGE_ROUTES),
    HomepageModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    MatNativeDateModule
  ],
  declarations: [ ImageCropperComponent, PersonalPageDynamicComponent, PersonalPageDynamicHostDirective, ...importComs, ChangePasswordComponent, ChangeEmailComponent, PersonalPageFrameworkComponent],
  providers: [ ],
  entryComponents:[ ...importComs ]
})
export class PersonalPageModule { }
