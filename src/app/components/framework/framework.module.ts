import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { RouterModule, Routes} from "@angular/router";
import { HomePageComponent } from '../home-page/home-page.component';
import { HeaderComponent } from '../header/header.component';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { HomepageModule } from '../home-page/home-page.module'
import { InforBoxComponent } from '../infor-box/infor-box.component';
import { FooterComponent } from '../footer/footer.component';
import { ContentListComponent } from '../content-list/content-list.component';

export const FRAMEWORK_ROUTES: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'detail', component: DetailPageComponent}
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(FRAMEWORK_ROUTES)
  ],
  declarations: [
    HomePageComponent,
    HeaderComponent,
    DetailPageComponent,
    InforBoxComponent,
    FooterComponent,
    ContentListComponent
  ],
  providers: [ ],
  exports:[ HeaderComponent ]
})
export class FrameworkModule { }
