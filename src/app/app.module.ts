import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG, APP_DI_CONFIG } from './app-config';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanDeactivateGuard } from '../app/guards/can-deactivate.guard';
import { AuthGuard } from '../app/guards/auth-guard.service';
import { WindowRefService } from '../../src/app/services/window-ref.service';
import { HomepageModule } from '../app/components/home-page/home-page.module';
import { AppNavigationService } from '../../src/app/services/app-navigation.service';
import { DialogService } from '../../src/app/services/dialog.service';
import { AuthService } from '../app/services/auth.service';
import { CustomInterceptor } from './custom.interceptor';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({tokenName: 'jwt', noJwtError: true}), http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    HomepageModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http]
    },
    CanDeactivateGuard,
    AuthGuard,
    WindowRefService,
    AppNavigationService,
    DialogService,
    AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
