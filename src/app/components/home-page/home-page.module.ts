import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkComponent } from '../home-page/framework/framework.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from "@angular/router";
// import { AuthModule } from "../../auth.module";
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContentListComponent } from '../content-list/content-list.component';
import { InforBoxComponent } from '../infor-box/infor-box.component';
// import { HeaderComponent } from '../header/header.component';
// import { AccountPortalComponent } from '../account-portal/account-portal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    // AuthModule,
  ],
  declarations: [ 
    FrameworkComponent, 
    HeaderComponent, FooterComponent, ContentListComponent, InforBoxComponent,
    // AccountPortalComponent,
  ],
  providers: [ AuthService],
})
export class HomepageModule { }
