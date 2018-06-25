import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PersonalPageComponent } from '../personal-page/personal-page.component';
import { HomepageModule } from '../home-page/home-page.module';
import { DialogModule } from '../dialog/dialog.module';
import { PersonalPageDynamicHostDirective } from '../../directives/personal-page-dynamic-host.directive';
import { importComs } from '../../models/comMgr';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

export const PERSONALPAGE_ROUTES: Routes = [
  {path: '', component: PersonalPageComponent}
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
  declarations: [ PersonalPageComponent, PersonalPageDynamicHostDirective, ...importComs],
  providers: [ ],
  entryComponents:[ ...importComs ]
})
export class PersonalPageModule { }
