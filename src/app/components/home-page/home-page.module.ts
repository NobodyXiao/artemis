import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GetTokenService } from '../../services/get-token.service';
import { HomePageComponent } from './home-page.component';
import { HeaderComponent } from '../header/header.component';
import { ContentListComponent } from '../content-list/content-list.component';
import { FooterComponent } from '../footer/footer.component';
import { InforBoxComponent } from '../infor-box/infor-box.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  declarations:[ HomePageComponent,HeaderComponent,FooterComponent,InforBoxComponent, ContentListComponent],
  providers: [ GetTokenService ],
  exports: [InforBoxComponent, HeaderComponent] 
})
export class HomepageModule { }
