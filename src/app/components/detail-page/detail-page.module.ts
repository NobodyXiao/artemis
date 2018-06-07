import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { GetTokenService } from '../../services/get-token.service';
import { HomepageModule } from '../home-page/home-page.module';
import { MarkdownModule } from 'angular2-markdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '../dialog/dialog.module';

export const DETAILPAGE_ROUTES: Routes = [
  {path: '', component: DetailPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DETAILPAGE_ROUTES),
    HomepageModule,
    MarkdownModule.forRoot(),
    FormsModule,
    DialogModule
  ],
  declarations: [ DetailPageComponent ],
  providers: [ ]
})
export class DetailpageModule { }
