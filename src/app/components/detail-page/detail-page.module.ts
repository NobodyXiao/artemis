import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { GetTokenService } from '../../services/get-token.service';
import { HomepageModule } from '../home-page/home-page.module';

export const DETAILPAGE_ROUTES: Routes = [
  {path: '', component: DetailPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DETAILPAGE_ROUTES),
    HomepageModule
  ],
  declarations: [ DetailPageComponent ],
  providers: [ ]
})
export class DetailpageModule { }
