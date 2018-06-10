import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PersonalPageComponent } from '../personal-page/personal-page.component';
import { GetTokenService } from '../../services/get-token.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '../dialog/dialog.module';
import { HomepageModule } from '../home-page/home-page.module';

export const PERSONALPAGE_ROUTES: Routes = [
  {path: '', component: PersonalPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PERSONALPAGE_ROUTES),
    FormsModule,
    DialogModule,
    HomepageModule
  ],
  declarations: [ PersonalPageComponent],
  providers: [ ]
})
export class PersonalPageModule { }
